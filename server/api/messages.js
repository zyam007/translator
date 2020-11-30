const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
const Sequelize = require('sequelize')
const {Op} = Sequelize
module.exports = router

router.get('/:id/:otherId', async (req, res, next) => {
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

router.post('/:id/:otherId', async (req, res, next) => {
  try {
    // let bodyKey = req.body.key
    let id = Number(req.params.id)
    let otherId = Number(req.params.otherId)
    let text = req.body.text
    const message = await Message.createMessage(text, id, otherId)
    // const newMessage = await Message.createMessage(req.body, req.params.id, req.params.otherId)
    // console.dir(req.params)
    // console.dir(req.body)

    res.json(message)
  } catch (err) {
    next(err)
  }
})
