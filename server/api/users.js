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
