const router = require('express').Router()
const {User} = require('../db/models')
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

router.post('/friends', async (req, res, next) => {
  const {userId} = req.body
  try {
    // const results = await User.findOne({
    //   where: {id: userId},
    //   include: [
    //     {
    //       model: User,
    //       as: 'friends',
    //     },
    //   ],
    // })
    const user = await User.findByPk(userId)
    const results = await user.findFriend()
    res.json(results)
  } catch (err) {
    next(err)
  }
})
