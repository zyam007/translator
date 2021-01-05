// //translate??
const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
const Sequelize = require('sequelize')
const {Op} = Sequelize
const isUser = require('./isUser')
module.exports = router

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
    return translations
  }
  let result = await translateText()
  return result
}

router.post('/', isUser, async (req, res, next) => {
  try {
    apiId = process.env.API_ID
    let q = req.body.q
    let lan = req.body.lan
    let result = await translater(q, lan)
    res.json({translation: result})
  } catch (error) {
    console.error(error)
  }
})
router.post('/all', isUser, async (req, res, next) => {
  try {
    apiId = process.env.API_ID
    let arrayOfObj = req.body.messages
    let lan = req.body.language
    let resultArray = await translaterAll(arrayOfObj, lan)
    res.json({translation: resultArray})
  } catch (error) {
    console.error(error)
  }
})
async function translaterAll(arrayOfObj, lan) {
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
}
