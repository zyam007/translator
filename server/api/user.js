const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
module.exports = router

router.get('/conversations/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const conversationsFriends = await user.getConvos()
    res.json(conversationsFriends)
  } catch (err) {
    next(err)
  }
})
