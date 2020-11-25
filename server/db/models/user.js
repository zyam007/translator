const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

// need to add native language: enum default to english
// block array : [userId, userId]
// role: enum admin / regular user
const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    validate: {
      len: [6, 10]
    },
    get() {
      return () => this.getDataValue('password')
    }
  },
  userName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  profilePicture: {
    type: Sequelize.STRING,
    defaultValue: 'placeholder.jpg'
  },
  language: {
    type: Sequelize.ENUM('ENG', 'CHI', 'RUS'),
    defaultValue: 'ENG'
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
