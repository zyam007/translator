const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')
const Conversation = require('./conversation')
const Message = require('./message')

const Friendship = db.define('friendship', {
  status: {
    type: Sequelize.ENUM('requested', 'confirmed', 'denied', 'blocked'),
    allowNull: false,
    defaultValue: 'requested'
  },
  intro: {
    type: Sequelize.TEXT,
    defaultValue: 'I would like to be your friend.'
  }
})
Friendship.createFriendship = async (
  senderId,
  receiverId,
  intro = 'I would like to be your friend.'
) => {
  let friendship = await Friendship.findOne({
    where: {
      senderId: {
        [Sequelize.Op.or]: [senderId, receiverId]
      },
      receiverId: {
        [Sequelize.Op.or]: [senderId, receiverId]
      }
    }
  })
  if (!friendship) {
    friendship = await Friendship.create({
      senderId: senderId,
      receiverId: receiverId,
      status: 'requested',
      intro: intro
    })
  }
  return friendship
}
Friendship.prototype.confirm = async function() {
  this.status = 'confirmed'
  await this.save()
}
Friendship.prototype.block = async function() {
  this.status = 'blocked'
  await this.save()
}
Friendship.prototype.deny = async function() {
  this.status = 'denied'
  await this.save()
}

Friendship.prototype.deleteFriendship = async function() {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Sequelize.Op.or]: [this.senderId, this.receiverId]
      },
      user2Id: {
        [Sequelize.Op.or]: [this.senderId, this.receiverId]
      }
    }
  })

  //using conversation id destroy messages
  const messages = await Message.destroy({
    where: {
      conversationId: conversation.id
    }
  })

  conversation.destroy()
}
module.exports = Friendship
