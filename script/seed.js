'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const Conversation = require('../server/db/models/conversation')
const Message = require('../server/db/models/message')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  let user1 = await User.create({email: 'cody@email.com', password: '123'})
  let user2 = await User.create({email: 'murphy@email.com', password: '123'})
  let user3 = await User.create({
    email: 'Yanna@email.com',
    password: '123',
    nativeLanguage: 'RUS',
    role: 'ADMIN'
  })
  let user4 = await User.create({
    email: 'Jenna@email.com',
    password: '123',
    nativeLanguage: 'CHI',
    role: 'ADMIN'
  })
  let user5 = await User.create({
    email: 'Josephine@email.com',
    password: '123',
    nativeLanguage: 'ENG',
    role: 'ADMIN'
  })

  const message1 = await Message.createMessage('I like', user1, user2)
  // const message2 = await Message.create({
  //   content: 'Hello',
  //   userId: 2,
  //   // chatRoomId: 1
  // })

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
