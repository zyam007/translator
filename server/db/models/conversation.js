const Sequelize = require('sequelize')
const db = require('../db')
const Message = require('./message')
const {Op} = Sequelize

const Conversation = db.define('conversation', {
  user1Id: Sequelize.INTEGER,
  user2Id: Sequelize.INTEGER
})

Conversation.findOrCreateConversation = async function(user1Id, user2Id) {
  const conversation = await Conversation.findOrCreate({
    where: {
      user1Id: user1Id,
      user2Id: user2Id
    }
  })

  return conversation
}

module.exports = Conversation
