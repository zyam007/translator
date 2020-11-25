const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Conversation = require('./conversation')

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

User.prototype.getConvos = async function() {
  console.log('id', this.id)
  const part1 = await Conversation.findAll({
    where: {
      user1Id: this.id
    }
    // order by asc/dsc column
  })
  console.log('part1', part1[0].dataValues)
  // console.log('--------------p1--------------', part1['0'].dataValues.user2Id)
  const part2 = await Conversation.findAll({
    where: {
      user2Id: this.dataValues.id
    }
  })
  // include: {
  //   model: Tool,
  //   as: 'Instruments'
  //   where: {
  //     size: {
  //       [Op.ne]: 'small'
  //     }
  //   }
  // }
  // console.log('--------------p2--------------', part2['0'].dataValues.user1Id)
  let result = {
    conversations: part1.concat(part2)
  }
  // console.log(result)
  return result
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
