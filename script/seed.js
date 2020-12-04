'use strict'

const db = require('../server/db')
const {User, Friendship, Conversation, Message} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  let user1 = await User.create({
    email: 'cody@email.com',
    password: '123456',
    profilePicture: '/img/tran-pp1.jpg',
    userName: 'Cody'
  })
  let user2 = await User.create({
    email: 'murphy@email.com',
    password: '123456',
    profilePicture: '/img/tran-pp2.jpg',
    userName: 'Murphy',
    language: 'SPA'
  })
  let user3 = await User.create({
    email: 'yanna@email.com',
    password: '123456',
    userName: 'Yanna',
    profilePicture: '/img/tran-pp3.jpeg',
    language: 'RUS',
    isAdmin: true
  })
  let user4 = await User.create({
    email: 'jenna@email.com',
    password: '123456',
    userName: 'Jenna',
    profilePicture: '/img/tran-pp4.jpeg',
    language: 'CHI',
    isAdmin: true
  })
  let user5 = await User.create({
    email: 'josephine@email.com',
    password: '123456',
    userName: 'Josephine',
    profilePicture: '/img/tran-pp5.jpg',
    isAdmin: true
  })
  let user6 = await User.create({
    email: 'bob@email.com',
    password: '123456',
    userName: 'Bob',
    profilePicture: '/img/tran-pp6.jpg'
  })

  const message1 = await Message.createMessage('I like', user1.id, user2.id)
  const message2 = await Message.createMessage(
    'i dont like',
    user2.id,
    user1.id
  )
  const message3 = await Message.createMessage('I like', user1.id, user2.id)
  const message4 = await Message.createMessage('I like', user1.id, user4.id)
  const message5 = await Message.createMessage('I ok', user4.id, user1.id)
  const message6 = await Message.createMessage(
    'Are you hungy?',
    user2.id,
    user4.id
  )

  const friendship1 = await Friendship.createFriendship(
    1,
    2,
    'I would like to be your friend.'
  )
  const friendship10 = await Friendship.createFriendship(5, 1, 'Add me!')
  const friendship2 = await Friendship.createFriendship(
    2,
    3,
    'I want to be more than your friend.'
  )
  const friendship3 = await Friendship.createFriendship(
    1,
    3,
    'Be my friend please!'
  )
  const friendship4 = await Friendship.createFriendship(
    1,
    4,
    'Will you be my friend?'
  )
  const friendship5 = await Friendship.createFriendship(
    2,
    4,
    'Please add me :)'
  )
  const friendship6 = await Friendship.createFriendship(
    5,
    2,
    'Remember me from Spanish class?'
  )
  await friendship1.confirm()
  await friendship4.confirm()
  await friendship10.confirm()
  await friendship5.confirm()
  await friendship2.confirm()
  await friendship10.initiateChat()
  await friendship2.initiateChat()
  // await friendship2.deny()
  // await user1.getConvos()
  // await user1.findFriend()
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
