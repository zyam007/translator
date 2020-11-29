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

const addFriend = user => ({
  type: ADD_FRIEND,
  user
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

//need senderId, receiverId, note
//add create new in friendship model
export const fetchAddFriend = (email, userId, note) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/user/${email}/${userId}/${note}`)
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
      return action.user
    default:
      return state
  }
}
