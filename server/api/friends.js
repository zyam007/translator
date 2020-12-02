const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
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
      console.log('Friendship ...: ', friendship)
      if (!friendship) {
        friendship = await Friendship.findOne({
          where: {
            receiverId: id,
            senderId: friendId
          }
        })
      }

      await friendship.block()
      res.send(friendship)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const {id} = req.params
  const {userId} = req.body
  try {
    //res.json(results)
  } catch (err) {
    next(err)
  }
})
