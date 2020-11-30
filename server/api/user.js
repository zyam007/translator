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
    const friendship = await Friendship.create({
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      intro: req.body.intro
    })
    res.json(friendship)
  } catch (err) {
    next(err)
  }
})
