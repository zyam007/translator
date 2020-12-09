const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/user', require('./user'))
router.use('/messages', require('./messages'))
router.use('/friends', require('./friends'))
router.use('/translate', require('./translate'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
// module.exports = {
//   router: require('express').Router(),

//   isUser: function (req, res, next) {
//     if (!req.user) {
//       res.sendStatus(401)
//       return
//     }
//     next()
//   }
// }
