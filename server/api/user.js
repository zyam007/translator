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
