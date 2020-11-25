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
Friendship.prototype.confirm = async function() {
  this.status = 'confirmed'
  await this.save()
}
Friendship.prototype.block = async function() {
  this.status = 'blocked'
  await this.save()
}
Friendship.prototype.deny = async function() {
  this.status = 'denied'
  await this.save()
}
module.exports = Friendship
