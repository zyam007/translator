const router = require('express').Router()
const {User, Message, Friendship, Conversation} = require('../db/models')
module.exports = router

router.get('/conversations/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const conversationsFriends = await user.getConvos()
    let friendsList = conversationsFriends.friends
    let friends = []
    let fuser
    for (let i = 0; i < friendsList.length; i++) {
      fuser = await User.findByPk(friendsList[i])
      friends.push(fuser)
    }
    conversationsFriends.friends = friends
    res.json(conversationsFriends)
  } catch (err) {
    next(err)
  }
})

router.get('/:email', async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      where: {
        email: req.params.email
      }
    })
    console.dir(req.params)
    res.json(findUser)
  } catch (err) {
    next(err)
  }
})

//need senderId, receiverId, note
//add create new in friendship model
// export const fetchAddFriend = (email, userId, note) => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/user/${userId}/${email}/${note}`)
//     dispatch(addFriend(data))
//   } catch (err) {
//     console.error(err)
//   }
// }

router.get('/:userId/:email/:note', async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      where: {
        email: req.params.email
      }
    })
    console.dir(req.params)
    res.json(findUser)
  } catch (err) {
    next(err)
  }
})
