import axios from 'axios'
import history from '../history'
import socket from '../socket'

// ACTION TYPES
const GET_MESSAGES = 'GET_MESSAGES'
const POST_MESSAGE = 'POST_MESSAGE'
// ACTION CREATER
const getMessages = messages => ({type: GET_MESSAGES, messages})
const postMessage = message => ({type: POST_MESSAGE, message})

export const getAllMessages = (id, otherId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/messages/${id}/${otherId}`)
    dispatch(getMessages(data))
  } catch (err) {
    console.error(err)
  }
}

export const postAMessage = (text, id, otherId) => async dispatch => {
  try {
    console.log('theses all correct post a message', {
      userId: id,
      senderId: otherId
    })
    const res = await axios.post(`/api/messages/${id}/${otherId}`, {
      text: text
    })
    console.log(res.data)
    dispatch(postMessage(res.data))
    socket.emit('new-message', {
      message: text,
      senderId: id,
      receiverId: otherId
    })
  } catch (err) {
    console.error(err.message, err.response)
  }
}
let defaultMessages = {
  messages: [],
  loading: true
}
export default function(state = defaultMessages, action) {
  switch (action.type) {
    case GET_MESSAGES:
      console.log('in store, message.js, action.messages', action.messages)
      return {...state, messages: action.messages, loading: false}
    case POST_MESSAGE:
      console.log('in message store about to add it in', action.message)
      return {...state, messages: [...state.messages, action.message]}
    default:
      return state
  }
}
