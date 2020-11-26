import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_CONVO = 'GET_CONVO'
const GET_FRIENDS_IN_CONVO = 'GET_FRIENDS'

// ACTION CREATER
const getConversations = conversations => ({type: GET_CONVO, conversations})
const getFriendsInConvo = friends => ({type: GET_FRIENDS_IN_CONVO, friends})

export const getConvo = id => async dispatch => {
  try {
    const {data} = await axios.get(`/user/conversations/${id}`)
    dispatch(getConversations(data.conversations))
    dispatch(getFriends(data.friends))
  } catch (err) {
    console.error(err)
  }
}

//friendsIC: friends in conversation
defaultConvo = {
  conversations: [],
  allFriends: [],
  friendsIC: []
}
export default function(state = defaultConvo, action) {
  switch (action.type) {
    case GET_CONVO:
      console.log(
        'in store, convo.js, action.conversations',
        action.conversations
      )
      return {...state, conversations: action.conversations}
    case GET_FRIENDS_IN_CONVO:
      console.log('in store, convo.js, action.friends', action.friends)
      return {...state, friends: action.friends}
    default:
      return state
  }
}
