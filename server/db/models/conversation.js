const Sequelize = require('sequelize')
const db = require('../db')
// const {Op} = Sequelize

const Conversation = db.define('conversation', {
  user1Id: Sequelize.INTEGER,
  user2Id: Sequelize.INTEGER
})

Conversation.findOrCreateConversation = async (user1Id, user2Id) => {
  const conversation1 = await Conversation.findOne({
    where: {
      user1Id: user1Id,
      user2Id: user2Id
    }
  })

  const conversation2 = await Conversation.findOne({
    where: {
      user1Id: user2Id,
      user2Id: user1Id
    }
  })
  if (conversation1) return conversation1
  if (conversation2) return conversation2
  return await Conversation.create({
    user1Id: user1Id,
    user2Id: user2Id
  })
}

module.exports = Conversation
