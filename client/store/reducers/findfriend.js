import axios from 'axios'
import history from '../../history'

/**
 * ACTION TYPES
 */
const FIND_USER = 'FIND_USER'
const ADD_FRIEND = 'ADD_FRIEND'
const ERR_FINDING_USER = 'ERR_FINDING_USER'
/**
 * INITIAL STATE
 */

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

const errFindingUser = () => ({
  type: ERR_FINDING_USER
})

/**
 * THUNK CREATORS
 */
export const fetchUser = email => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${email}`)
    console.log(res)
    if (res.data == null) {
      dispatch(errFindingUser())
    } else {
      dispatch(findUser(res.data))
    }
  } catch (err) {
    dispatch(addErr(err))
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

const defaultUser = {
  user: {},
  error: false
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case FIND_USER:
      return {...state, user: action.user, error: false}
    case ADD_FRIEND:
      return defaultUser
    case ERR_FINDING_USER:
      return {...state, error: true}
    default:
      return state
  }
}
