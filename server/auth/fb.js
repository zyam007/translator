const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.post('/login/fb')
router.post('/signUp/fb', async (res, req, next) => {
  try {
    let user = await User.create({
      email: req.body.email,
      //password?
      userName: req.body.userName,
      profilePicture: req.user.url,
      facebookId: req.body.userId
    })
  } catch (err) {
    next(err)
  }
})

//   router.get(
//     '/callback',
//     passport.authenticate('google', {
//       successRedirect: '/',
//       failureRedirect: '/login'
//     })
//   )
// }
