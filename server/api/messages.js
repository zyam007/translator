const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
const Sequelize = require('sequelize')
const {Op} = Sequelize
const isUser = require('./isUser')
module.exports = router

router.get('/:id/:otherId', isUser, async (req, res, next) => {
  try {
    const convo = await Conversation.findOne({
      where: {
        user1Id: {
          [Op.or]: [req.params.id, req.params.otherId]
        },
        user2Id: {
          [Op.or]: [req.params.otherId, req.params.id]
        }
      }
    })
    const messages = await Message.findAll({
      where: {
        conversationId: convo.id
      },
      order: [['createdAt', 'ASC']]
    })
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/:otherId', isUser, async (req, res, next) => {
  let id = Number(req.params.id)
  let otherId = Number(req.params.otherId)
  try {
    if (req.user.dataValues.id !== Number(id)) {
      res.sendStatus(403)
    } else {
      let bool = req.body.bool
      if (bool) {
        let URL = req.body.text
        let text = await gifToText(URL)
        const message = await Message.createMessage(
          text,
          id,
          otherId,
          bool,
          URL
        )
        res.json(message)
      } else {
        let text = req.body.text
        const message = await Message.createMessage(
          text,
          id,
          otherId,
          bool,
          URL
        )
        res.json(message)
      }
    }
  } catch (err) {
    next(err)
  }
})

async function gifToText(text) {
  const vision = require('@google-cloud/vision')
  const client = new vision.ImageAnnotatorClient()
  const [result] = await client.textDetection(text)
  const detections = result.textAnnotations[0].description
  const phrase = detections.replace(/\n/g, ' ')
  return phrase
}
