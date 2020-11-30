import axios from 'axios'
import history from '../../history'

// ACTION TYPES
const GET_CONVO = 'GET_CONVO'
const GET_FRIENDS_IN_CONVO = 'GET_FRIENDS'

// ACTION CREATER
const getConversations = conversations => ({type: GET_CONVO, conversations})
const getOtherInConvo = friends => ({type: GET_FRIENDS_IN_CONVO, friends})

export const getConvo = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/user/conversations/${id}`)
    dispatch(getConversations(data.conversations))
    dispatch(getOtherInConvo(data.friends))
  } catch (err) {
    console.error(err)
  }
}

//friendsIC: friends in conversation
let defaultConvo = {
  conversations: [],
  otherIC: []
}
export default function(state = defaultConvo, action) {
  switch (action.type) {
    case GET_CONVO:
      return {...state, conversations: action.conversations}
    case GET_FRIENDS_IN_CONVO:
      return {...state, otherIC: action.friends}
    default:
      return state
  }
}
