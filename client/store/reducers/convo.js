import axios from 'axios'

// ACTION TYPES
const GET_CONVO = 'GET_CONVO'
const GET_FRIENDS_IN_CONVO = 'GET_FRIENDS'
const MARK_AS_ACTIVE = 'MARK_AS_ACTIVE'
const MARK_AS_INACTIVE = 'MARK_AS_INACTIVE'
// ACTION CREATER
const getConversations = conversations => ({type: GET_CONVO, conversations})
const getOtherInConvo = friends => ({type: GET_FRIENDS_IN_CONVO, friends})
export const markActive = id => ({
  type: MARK_AS_ACTIVE,
  id
})
export const markInactive = id => ({
  type: MARK_AS_INACTIVE,
  id
})
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
  otherIC: [],
  active: []
}

export default function(state = defaultConvo, action) {
  switch (action.type) {
    case GET_CONVO:
      return {...state, conversations: action.conversations}
    case GET_FRIENDS_IN_CONVO:
      return {...state, otherIC: action.friends}
    case MARK_AS_ACTIVE:
      return {...state, active: [...state.active, action.id]}
    case MARK_AS_INACTIVE:
      return {
        ...state,
        active: state.active.filter(userId => userId !== action.id)
      }
    default:
      return state
  }
}
