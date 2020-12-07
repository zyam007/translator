import axios from 'axios'
import socket from '../../socket'

/**
 * ACTION TYPES
 */
const FIND_FRIEND = 'FIND_FRIEND'
const ADD_FRIEND = 'ADD_FRIEND'
const ERR_FINDING_FRIEND = 'ERR_FINDING_FRIEND'
const RESET_ERROR = 'RESET_ERROR'

/**
 * INITIAL STATE
 */
const defaultFriend = {
  friend: {},
  error: 'pending'
}

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

export const resetError = () => ({
  type: RESET_ERROR
})

/**
 * THUNK CREATORS
 */
export const fetchFriend = email => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${email}`)
    if (res.data === null) {
      dispatch(errFindingFriend())
    } else {
      dispatch(findFriend(res.data))
    }
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
    socket.emit('new-friend', data)
    dispatch(addFriend(data.friendship))
  } catch (err) {
    console.error(err)
  }
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
    case RESET_ERROR:
      return {...state, error: 'pending'}
    default:
      return state
  }
}
