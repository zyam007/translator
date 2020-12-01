import axios from 'axios'
import history from '../../history'

/**
 * ACTION TYPES
 */
const FIND_FRIEND = 'FIND_FRIEND'
const ADD_FRIEND = 'ADD_FRIEND'
const ERR_FINDING_FRIEND = 'ERR_FINDING_FRIEND'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const findFriend = friend => ({
  type: FIND_FRIEND,
  friend
})

const addFriend = friend => ({
  type: ADD_FRIEND,
  friend
})

const errFindingFriend = () => ({
  type: ERR_FINDING_FRIEND
})

/**
 * THUNK CREATORS
 */
export const fetchFriend = email => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${email}`)
    console.log('res in fetchFriend in findFriend', res)
    if (res.data === null) {
      dispatch(errFindingFriend())
    } else {
      dispatch(findFriend(res.data))
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

const defaultFriend = {
  friend: {},
  error: false
}
/**
 * REDUCER
 */
export default function(state = defaultFriend, action) {
  switch (action.type) {
    case FIND_FRIEND:
      return {...state, friend: action.friend, error: false}
    case ADD_FRIEND:
      return defaultFriend
    case ERR_FINDING_FRIEND:
      return {...state, error: true}
    default:
      return state
  }
}
