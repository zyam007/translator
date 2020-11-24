const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const Message = db.define('message', {
  text: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  recerverId: Sequelize.INTEGER
  // _id: {
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV4,
  //   primaryKey: true
  // }
})

Message.createMessage = (text, sender, receiver) => {
  return Promise.all([
    Message.create({
      text,
      userId: sender.id,
      recerverId: receiver.id
      // user: {
      //   _id: sender.id,
      //   email: sender.email
      // }
    }),
    db.models.conversation.findOrCreateConversation(sender.id, receiver.id)
  ]).then(([message, conversation]) => message.setConversation(conversation))
}
module.exports = Message
