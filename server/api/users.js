const router = require('express').Router()
const {User, Friendship, Message} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  const {id, userName, language, profilePicture} = req.body
  try {
    const user = await User.findByPk(id)
    await user.update({userName, language, profilePicture})
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// router.post('/friends', async (req, res, next) => {
//   const {userId} = req.body
//   try {
//     const user = await User.findByPk(userId)
//     const results = await user.findFriend()
//     res.json(results)
//   } catch (err) {
//     next(err)
//   }
// })
// hard coded route to add myself some friends
router.get('/jenna', async (req, res, next) => {
  try {
    const jenna = await User.findByPk(6)
    jenna.language = 'CHI'
    res.json(jenna)
  } catch (err) {
    next(err)
  }
})

// const friendship1 = await Friendship.createFriendship(
//   1,
//   6,
//   'I would like to be your friend.'
// )
// const friendship2 = await Friendship.createFriendship(
//   2,
//   6,
//   'I would like to be your friend.'
// )
// await friendship1.confirm()
// await friendship2.confirm()
// const jennafriend = await jenna.findFriend()
// const message1 = await Message.createMessage('hello world', 6, 2)
// const message2 = await Message.createMessage('hello world', 6, 1)
