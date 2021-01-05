const router = require('express').Router()
const {User, Friendship, Message} = require('../db/models')
const isUser = require('./isUser')
module.exports = router

router.get('/', isUser, async (req, res, next) => {
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

router.put('/', isUser, async (req, res, next) => {
  const {id, userName, language, profilePicture} = req.body
  try {
    if (req.user.dataValues.id !== Number(req.body.id)) {
      res.sendStatus(403)
    } else {
      const user = await User.findByPk(id)
      await user.update({userName, language, profilePicture})
      res.json(user)
    }
  } catch (err) {
    next(err)
  }
})
