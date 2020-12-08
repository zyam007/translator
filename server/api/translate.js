// //translate??
const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
const Sequelize = require('sequelize')
const {Op} = Sequelize
module.exports = router

const adminOrUser = (req, res, next) => {
  if (
    !req.user ||
    (req.user.isAdmin && Number(req.user.id) !== Number(req.params.userId))
  ) {
    const err = new Error('Unauthorized')
    err.status = 401
    return next(err)
  }
  next()
}

const {Translate} = require('@google-cloud/translate').v2
const projectId = 'translate-chat-297404'
const translate = new Translate({
  projectId: projectId,
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  }
})

async function translater(text, target) {
  // const {Translate} = require('@google-cloud/translate').v2
  // const translate = new Translate()
  const {Translate} = require('@google-cloud/translate').v2
  const projectId = 'translate-chat-297404'
  const translate = new Translate({
    projectId: projectId,
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL
    }
  })
  async function translateText() {
    let [translations] = await translate.translate(text, target)
    // console.log('this is translations', translations)
    // translations = Array.isArray(translations) ? translations : [translations]
    // translations.forEach((translation, i) => {
    //   `${text[i]} => (${target}) ${translation}`
    // })
    return translations
  }
  let result = await translateText()
  return result
  // [END translate_translate_text]
}

router.post('/', adminOrUser, async (req, res, next) => {
  try {
    apiId = process.env.API_ID
    let q = req.body.q
    let lan = req.body.lan
    // console.dir(req.body)
    let result = await translater(q, lan)
    // console.log(result)
    // res.set('Content-Type', 'text/html')
    res.json({translation: result})
  } catch (error) {
    console.error(error)
  }
})
router.post('/all', adminOrUser, async (req, res, next) => {
  try {
    apiId = process.env.API_ID
    let arrayOfObj = req.body.messages
    let lan = req.body.language
    // console.dir(req.body.messages)
    // console.dir(req.body.language)
    let resultArray = await translaterAll(arrayOfObj, lan)
    // console.log(resultArray)
    // res.set('Content-Type', 'text/html')
    res.json({translation: resultArray})
  } catch (error) {
    console.error(error)
  }
})
async function translaterAll(arrayOfObj, lan) {
  // const {Translate} = require('@google-cloud/translate').v2
  // const translate = new Translate()
  const {Translate} = require('@google-cloud/translate').v2
  const projectId = 'translate-chat-297404'
  const translate = new Translate({
    projectId: projectId,
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL
    }
  })
  async function translateText() {
    for (let i = 0; i < arrayOfObj.length; i++) {
      let [translations] = await translate.translate(arrayOfObj[i].text, lan)
      arrayOfObj[i].translation = translations
    }
    return arrayOfObj
  }
  let result = await translateText()
  return result
  // [END translate_translate_text]
}
