const Sequelize = require('sequelize')
const db = require('../db')

const Friendship = db.define('friendship', {
  status: {
    type: Sequelize.ENUM('requested', 'confirmed', 'denied', 'blocked'),
    allowNull: false,
    defaultValue: 'requested'
  },
  intro: {
    type: Sequelize.TEXT,
    defaultValue: 'I would like to be your friend.'
  }
})

module.exports = Friendship
