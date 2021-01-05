import axios from 'axios'
import history from '../../history'
import socket from '../../socket'
import store from '../index'
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const putUser = user => ({
  type: UPDATE_USER,
  user
})
/**
 * THUNK CREATORS
 */
export const updateUser = user => {
  return async dispatch => {
    try {
      if (user.upload) {
        const formData = new FormData() //multipart form to upload file
        formData.append('upload', user.upload)
        const {data} = await axios.post('/api/upload', formData, {
          headers: {'content-type': 'multipart/form-data'}
        })
        user.upload = null
        user.profilePicture = data //once we get the profilePicture we can set it on product input
      }
      const {data} = await axios.put('/api/users', user)
      dispatch(putUser(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  userName,
  language
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      userName,
      language
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/main')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    let state = store.getState()
    socket.emit('inActive', state.user)
    await axios.post('/auth/logout')
    dispatch(removeUser())

    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
