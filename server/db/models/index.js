const User = require('./user')
const Conversation = require('./conversation')
const Friendship = require('./friendship')
const Message = require('./message')

Conversation.belongsTo(User, {as: 'user1'})
Conversation.belongsTo(User, {as: 'user2'})
Message.belongsTo(Conversation)
Conversation.hasMany(Message)
Message.belongsTo(User, {as: 'user'})
Message.belongsTo(User, {as: 'receiver'})

User.belongsToMany(User, {
  as: 'friends',
  through: Friendship,
  foreignKey: 'senderId',
  otherKey: 'receiverId'
})

module.exports = {
  User,
  Message,
  Friendship,
  Conversation
}
