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
const findUser = email => ({
  type: FIND_USER,
  email
})

const addFriend = () => ({
  type: ADD_FRIEND,
  friend
})

/**
 * THUNK CREATORS
 */
export const fetchUser = email => async dispatch => {
  try {
    const {data} = await axios.get('/user', email)
    dispatch(findUser(data.email))
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
