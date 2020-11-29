import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FIND_USER = 'FIND_USER'
const ADD_FRIEND = 'ADD_FRIEND'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const findUser = user => ({
  type: FIND_USER,
  user
})

const addFriend = friend => ({
  type: ADD_FRIEND,
  friend
})

/**
 * THUNK CREATORS
 */
export const fetchUser = email => async dispatch => {
  try {
    const {data} = await axios.get(`/api/user/${email}`)
    dispatch(findUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAddFriend = (
  senderId,
  receiverId,
  intro
) => async dispatch => {
  try {
    const friendRequest = {
      senderId: senderId,
      receiverId: receiverId,
      intro: intro
    }
    const {data} = await axios.post('/api/user/addFriend', friendRequest)
    dispatch(addFriend(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case FIND_USER:
      return action.user
    case ADD_FRIEND:
      return defaultUser
    default:
      return state
  }
}
