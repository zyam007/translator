const Sequelize = require('sequelize')
const db = require('../db')
const {Op} = Sequelize

// const ChatRoom = db.define('chatRoom', {
//   name: {
//     type: Sequelize.STRING,
//     defaultValue: 'ChatRoom'
//   }
// })

const Conversation = db.define('conversation', {
  user1Id: Sequelize.INTEGER,
  user2Id: Sequelize.INTEGER
})

Conversation.findOrCreateConversation = async (user1Id, user2Id) => {
  const conversation = await Conversation.findorCreate({
    where: {
      user1Id,
      user2Id
    }
  })
  return conversation
}

module.exports = Conversation
