const Sequelize = require('sequelize')
const db = require('../db')
// const User = require('./user')
const Conversation = require('./conversation')

const Message = db.define('message', {
  text: {
    type: Sequelize.TEXT
    // validate: {
    //   notEmpty: true
    // }
  },
  isImage: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  userId: Sequelize.INTEGER,
  receiverId: Sequelize.INTEGER,
  URL: Sequelize.TEXT
})

Message.createMessage = async (text, senderId, receiverId, bool, URL) => {
  const message = await Message.create({
    text,
    userId: senderId,
    receiverId: receiverId,
    isImage: bool,
    URL
  })
  const conversation1 = await Conversation.findOrCreateConversation(
    senderId,
    receiverId
  )

  await message.setConversation(conversation1.id)
  await message.save()

  return message
}
module.exports = Message
