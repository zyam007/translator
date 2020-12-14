'use strict'
/* eslint-disable */
const db = require('../server/db')
const {User, Friendship, Conversation, Message} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  let user1 = await User.create({
    email: 'josephine@amos.com',
    password: '123456',
    profilePicture: '/img/tran-pp5.jpg',
    userName: 'Josephine',
    isAdmin: true
  })
  let user2 = await User.create({
    email: 'murphy@email.com',
    password: '123456',
    profilePicture: '/img/tran-pp1.jpg',
    userName: 'Murphy',
    language: 'SPA'
  })
  let user3 = await User.create({
    email: 'yanna@email.com',
    password: '123456',
    userName: 'Yanna',
    profilePicture: '/img/tran-pp3.jpg',
    language: 'RUS',
    isAdmin: true
  })
  let user4 = await User.create({
    email: 'jenna@email.com',
    password: '123456',
    userName: 'Jenna',
    profilePicture: '/img/tran-pp4.jpg',
    language: 'CHI',
    isAdmin: true
  })
  let user5 = await User.create({
    email: 'cody@email.com',
    password: '123456',
    userName: 'Cody',
    language: 'ENG',
    profilePicture: '/img/tran-pp2.jpg'
  })
  let user6 = await User.create({
    email: 'hiro@email.com',
    password: '123456',
    userName: 'Hiro',
    language: 'JAP',
    profilePicture: '/img/tran-pp7.jpg'
  })
  let user7 = await User.create({
    email: 'nikka@email.com',
    password: '123456',
    userName: 'Nikka',
    language: 'FRE',
    profilePicture: '/img/tran-pp8.jpg'
  })
  let user8 = await User.create({
    email: 'ramsey@email.com',
    password: '123456',
    userName: 'Ramsey',
    language: 'ARA',
    profilePicture: '/img/tran-pp9.jpg'
  })
  let user9 = await User.create({
    email: 'eun@email.com',
    password: '123456',
    userName: 'Eun',
    language: 'KOR',
    profilePicture: '/img/tran-pp10.jpg'
  })
  let user10 = await User.create({
    email: 'ravi@email.com',
    password: '123456',
    userName: 'Ravi',
    language: 'HIN',
    profilePicture: '/img/tran-pp6.jpg'
  })

  const message1 = await Message.createMessage(
    'Good morning',
    user1.id,
    user2.id
  )
  const message2 = await Message.createMessage(
    'Good afternoon',
    user3.id,
    user1.id
  )
  const message3 = await Message.createMessage('Good night', user1.id, user4.id)
  const message4 = await Message.createMessage(
    'How are you?',
    user1.id,
    user5.id
  )
  const message5 = await Message.createMessage(
    'Are you free?',
    user6.id,
    user1.id
  )
  const message6 = await Message.createMessage(
    'Are you hungry?',
    user7.id,
    user1.id
  )
  const message7 = await Message.createMessage(
    'Did you take notes?',
    user8.id,
    user1.id
  )

  const friendship1 = await Friendship.createFriendship(
    1,
    2,
    'I would like to be your friend.'
  )
  const friendship2 = await Friendship.createFriendship(
    3,
    1,
    'I want to be more than your friend.'
  )
  const friendship3 = await Friendship.createFriendship(
    1,
    4,
    'Be my friend please!'
  )
  const friendship4 = await Friendship.createFriendship(
    5,
    1,
    'Will you be my friend?'
  )
  const friendship5 = await Friendship.createFriendship(
    6,
    1,
    'Please add me :)'
  )
  const friendship6 = await Friendship.createFriendship(
    7,
    1,
    'We met at the meeting'
  )
  const friendship7 = await Friendship.createFriendship(
    8,
    1,
    'I was in your Spanish class'
  )
  const friendship9 = await Friendship.createFriendship(
    9,
    1,
    'Remember me from math class?'
  )
  await friendship1.confirm()
  await friendship2.confirm()
  await friendship3.confirm()
  await friendship4.confirm()
  await friendship5.confirm()
  await friendship6.confirm()
  await friendship7.confirm()
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
