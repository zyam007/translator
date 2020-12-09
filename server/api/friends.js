const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
const isUser = require('./isUser')
module.exports = router

const isUser = (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401)
    return
  }
  next()
}

router.get('/:id', isUser, async (req, res, next) => {
  const {id} = req.params
  try {
    const user = await User.findByPk(id)
    const results = await user.findFriend()
    res.json(results)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isUser, async (req, res, next) => {
  const {id} = req.params
  const {friendId, action} = req.body
  try {
    if (
      req.user.dataValues.id !== Number(id) &&
      req.user.dataValues.id !== friendId
    ) {
      // console.log(' this is req.user.dataValues.id', req.user.dataValues.id, ' this is id', typeof id, 'this is friendId', friendId)
      res.sendStatus(403)
    } else {
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
        if (friendship.status === 'blocked') {
          await friendship.unblock()
        } else await friendship.block()
        res.send(friendship)
      }
    }
  } catch (err) {
    next(err)
  }
})

// test in postman
router.delete('/:id', isUser, async (req, res, next) => {
  const {id} = req.params
  const {friendId} = req.body
  try {
    if (
      req.user.dataValues.id !== Number(id) &&
      req.user.dataValues.id !== friendId
    ) {
      // console.log(' this is req.user.dataValues.id', req.user.dataValues.id, ' this is id', typeof id, 'this is friendId', friendId)
      res.sendStatus(403)
    } else {
      console.dir(req.body)
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
    }
  } catch (err) {
    next(err)
  }
})
