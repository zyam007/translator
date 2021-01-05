const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Conversation = require('./conversation')
const Friendship = require('./friendship')

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
    allowNull: false,
    defaultValue: 'change your username'
  },
  profilePicture: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cHVnfGVufDB8fDB8&auto=format&fit=crop&w=800&q=60'
  },
  language: {
    type: Sequelize.ENUM(
      'ENG',
      'CHI',
      'RUS',
      'SPA',
      'FIL',
      'FRE',
      'HIN',
      'ARA',
      'KOR',
      'ja'
    ),
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
  },
  facebookId: {
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
  const part1 = await Conversation.findAll({
    where: {
      user1Id: this.id
    }
    // order by asc/dsc column
  })
  const otherInChatP1 = part1.map(user => {
    return user.dataValues.user2Id
  })
  const part2 = await Conversation.findAll({
    where: {
      user2Id: this.id
    }
  })
  const otherInChatP2 = part2.map(user => {
    return user.dataValues.user1Id
  })
  let result = {
    conversations: part1.concat(part2),
    friends: otherInChatP1.concat(otherInChatP2)
  }
  return result
}

User.prototype.findFriend = async function() {
  let newRequests = []
  let confirmed = []
  let requested = []
  let blocked = []
  const part1 = await Friendship.findAll({
    where: {
      senderId: this.id
    }
  })

  const otherFP1 = await Promise.all(
    part1.map(async user => {
      let person = await User.findByPk(user.dataValues.receiverId)
      if (user.dataValues.status === 'confirmed') confirmed.push(person)
      if (user.dataValues.status === 'requested') requested.push(person)
      if (user.dataValues.status === 'blocked') blocked.push(person)
      return person
    })
  )

  const part2 = await Friendship.findAll({
    where: {
      receiverId: this.id
    }
  })

  const otherFP2 = await Promise.all(
    part2.map(async user => {
      let person = await User.findByPk(user.dataValues.senderId)
      if (user.dataValues.status === 'confirmed') confirmed.push(person)
      if (user.dataValues.status === 'requested') newRequests.push(person)
      if (user.dataValues.status === 'blocked') blocked.push(person)
      return person
    })
  )

  let result = {
    friendships: part1.concat(part2),
    friends: otherFP1.concat(otherFP2),
    newRequests,
    requested,
    confirmed,
    blocked
  }
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
