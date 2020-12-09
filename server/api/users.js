const router = require('express').Router()
const {User, Friendship, Message} = require('../db/models')
module.exports = router

const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('Unauthorized')
    err.status = 401
    return next(err)
  }
  next()
}

const adminOrUser = (req, res, next) => {
  if (
    !req.user ||
    (req.user.isAdmin && Number(req.user.id) !== Number(req.params.id))
  ) {
    const err = new Error('Unauthorized')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', adminsOnly, async (req, res, next) => {
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

router.put('/', adminOrUser, async (req, res, next) => {
  const {id, userName, language, profilePicture} = req.body
  try {
    const user = await User.findByPk(id)
    await user.update({userName, language, profilePicture})
    res.json(user)
  } catch (err) {
    next(err)
  }
})
