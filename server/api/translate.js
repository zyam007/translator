// //translate??
const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
const Sequelize = require('sequelize')
const {Op} = Sequelize
module.exports = router
// const { Translate } = require('@google-cloud/translate').v2

async function translater(text, target) {
  const {Translate} = require('@google-cloud/translate').v2
  const translate = new Translate()
  async function translateText() {
    let [translations] = await translate.translate(text, target)
    console.log('this is translations', translations)
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

router.post('/', async (req, res, next) => {
  try {
    projectId = process.env.PROJECT_ID
    let q = req.body.q
    let lan = req.body.lan
    console.dir(req.body)
    let result = await translater(q, lan)
    console.log(result)
    // res.set('Content-Type', 'text/html')
    res.json({translation: result})
  } catch (error) {
    console.error(error)
  }
})
