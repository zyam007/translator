const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Conversation = require('./conversation')

const Message = db.define('message', {
  text: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  receiverId: Sequelize.INTEGER
})

Message.createMessage = async (text, sender, receiver) => {
  const message = await Message.create({
    text,
    userId: sender.id,
    receiverId: receiver.id
  })
  const conversation1 = await Conversation.findOrCreateConversation(
    sender.id,
    receiver.id
  )

  // console.log(conversation1.dataValues.id)
  await message.setConversation(conversation1.dataValues.id)
}
module.exports = Message
// Object.keys(conversation.__proto__)
