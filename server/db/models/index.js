const User = require('./user')
const Conversation = require('./conversation')
const Friendship = require('./friendship')
const Message = require('./message')

// Chatroom.hasMany(Message)
// Message.belongsTo(Chatroom)
// Message.belongsTo(User)
// User.hasMany(Message)
// MessageRecipient.belongsTo(Message)
// User.belongsTo(Chatroom)
// Chatroom.hasMany(User)
// Chatroom.belongsTo(User, {
//   through: Message
// })
// User.hasMany(Conversation)
Conversation.belongsTo(User, {as: 'user1'})
Conversation.belongsTo(User, {as: 'user2'})
Message.belongsTo(Conversation)
Conversation.hasMany(Message)
// Message.belongsTo(User, { as: 'sender' })
// Message.belongsTo(User, { as: 'receive' })
User.belongsToMany(User, {
  as: 'friends',
  through: Friendship,
  foreignKey: 'senderId',
  otherKey: 'receiverId'
})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Message,
  Friendship,
  Conversation
}
