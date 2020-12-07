const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log('Facebook client ID / secret not found. Skipping Facebook OAuth.')
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'displayName', 'emails', 'photos']
  }
  const strategy = new FacebookStrategy(
    facebookConfig,
    (accessToken, refreshToken, profile, done) => {
      const facebookId = profile.id
      const email = profile.emails[0].value || ''
      const profilePicture = profile.photos[0].value || ''
      const firstName = profile.displayName
      const userName = firstName

      User.findOrCreate({
        where: {facebookId},
        defaults: {email, profilePicture, userName}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )
  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('facebook', {scope: ['email', 'public_profile']})
  )

  router.get(
    '/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )
}
