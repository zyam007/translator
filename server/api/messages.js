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

router.get('/:id/:otherId', adminOrUser, async (req, res, next) => {
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

router.post('/:id/:otherId', adminOrUser, async (req, res, next) => {
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
