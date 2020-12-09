const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
const isUser = require('./isUser')
module.exports = router

router.get('/:id', async (req, res, next) => {
  const {id} = req.params
  //const {userId} = req.body
  try {
    const user = await User.findByPk(id)
    const results = await user.findFriend()
    res.json(results)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const {id} = req.params
  const {friendId, action} = req.body
  console.log('params: ', id, friendId, action)
  try {
    if (action === 'accept') {
      const friendship = await Friendship.findOne({
        where: {
          receiverId: id,
          senderId: friendId
        }
      })
      await friendship.confirm()
      await friendship.initiateChat()
      res.send(friendship)
    }
    if (action === 'deny') {
      //change status to deny
      const friendship = await Friendship.findOne({
        where: {
          receiverId: id,
          senderId: friendId
        }
      })
      await friendship.deny()
      res.send(friendship)
    }

    if (action === 'cancel') {
      //change status to deny
      const friendship = await Friendship.findOne({
        where: {
          receiverId: friendId,
          senderId: id
        }
      })
      await friendship.deny()
      res.send(friendship)
    }

    if (action === 'block') {
      //change status to deny
      let friendship = await Friendship.findOne({
        where: {
          receiverId: friendId,
          senderId: id
        }
      })
      if (!friendship) {
        friendship = await Friendship.findOne({
          where: {
            receiverId: id,
            senderId: friendId
          }
        })
      }
      console.log('status of friends!!!!!', friendship.status)
      if (friendship.status === 'blocked') {
        await friendship.unblock()
      } else await friendship.block()
      res.send(friendship)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const {id} = req.params
  const {friendId} = req.body
  try {
    let friendship = await Friendship.findOne({
      where: {
        receiverId: id,
        senderId: friendId
      }
    })
    if (!friendship) {
      friendship = await Friendship.findOne({
        where: {
          receiverId: friendId,
          senderId: id
        }
      })
    }
    friendship.deleteFriendship()
    const result = friendship.destroy()
    res.json(result)
  } catch (err) {
    next(err)
  }
})
