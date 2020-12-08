const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
const Sequelize = require('sequelize')
const {Op} = Sequelize
module.exports = router

router.get('/:id/:otherId', async (req, res, next) => {
  try {
    console.log('EIR', req.params.id)
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

router.post('/:id/:otherId', async (req, res, next) => {
  try {
    let id = Number(req.params.id)
    let otherId = Number(req.params.otherId)
    let text = req.body.text
    let bool = req.body.bool
    const message = await Message.createMessage(text, id, otherId, bool)
    res.json(message)
  } catch (err) {
    next(err)
  }
})
