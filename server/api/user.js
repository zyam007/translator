const router = require('express').Router()
const index = require('./index.js')
const {User, Message, Friendship, Conversation} = require('../db/models')
module.exports = router
const isUser = (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401)
    return
  }
  next()
}
router.get('/conversations/:id', isUser, async (req, res, next) => {
  try {
    if (req.user.dataValues.id !== Number(req.params.id)) {
      res.sendStatus(403)
    } else {
      const user = await User.findByPk(req.params.id)
      const conversationsFriends = await user.getConvos()
      let friendsList = conversationsFriends.friends
      let friends = []
      let fuser
      for (let i = 0; i < friendsList.length; i++) {
        fuser = await User.findByPk(friendsList[i])
        friends.push(fuser)
      }
      conversationsFriends.friends = friends
      res.json(conversationsFriends)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:email', isUser, async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      where: {
        email: req.params.email
      }
    })

    res.json(findUser)
  } catch (err) {
    next(err)
  }
})

router.post('/addFriend', isUser, async (req, res, next) => {
  try {
    // console.dir(req.user)
    if (req.user.dataValues.id !== Number(req.body.senderId)) {
      res.sendStatus(403)
    } else {
      const friendship = await Friendship.createFriendship(
        req.body.senderId,
        req.body.receiverId,
        req.body.intro
      )
      const sender = await User.findByPk(friendship.senderId)
      const receiver = await User.findByPk(friendship.receiverId)
      let result = {
        friendship,
        sender,
        receiver
      }
      res.json(result)
    }
  } catch (err) {
    next(err)
  }
})
