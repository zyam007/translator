'use strict'

const db = require('../server/db')
const {User, Friendship, Conversation, Message} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  let user1 = await User.create({
    email: 'cody@email.com',
    password: '123456',
    userName: 'Cody'
  })
  let user2 = await User.create({
    email: 'murphy@email.com',
    password: '123456',
    userName: 'Murphy'
  })
  let user3 = await User.create({
    email: 'Yanna@email.com',
    password: '123456',
    userName: 'Yanna',
    language: 'RUS',
    isAdmin: true
  })
  let user4 = await User.create({
    email: 'Jenna@email.com',
    password: '123456',
    userName: 'Jenna',
    language: 'CHI',
    isAdmin: true
  })
  let user5 = await User.create({
    email: 'Josephine@email.com',
    password: '123456',
    userName: 'Josephine',
    language: 'ENG',
    isAdmin: true
  })

  const message1 = await Message.createMessage('I like', user1, user2)
  const message2 = await Message.createMessage('i dont like', user2, user1)
  const message3 = await Message.createMessage('I like', user1, user2)
  const message4 = await Message.createMessage('I like', user3, user1)
  const friendship1 = await Friendship.create({
    senderId: 1,
    receiverId: 2,
    status: 'requested',
    intro: 'I would like to be your friend.'
  })
  const friendship2 = await Friendship.create({
    senderId: 2,
    receiverId: 1,
    status: 'requested',
    intro: 'I would like to be more than your friend.'
  })
  await friendship1.confirm()
  await friendship2.deny()
  await user1.getConvos()
  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
