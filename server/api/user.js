const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
module.exports = router

router.get('/conversations/:id', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err)
  }
})

router.get('/:email', async (req, res, next) => {
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

router.post('/addFriend', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err)
  }
})
