import axios from 'axios'
import socket from '../../socket'

// ACTION TYPES
const GET_MESSAGES = 'GET_MESSAGES'
const POST_MESSAGE = 'POST_MESSAGE'
const GET_TRANSLATIONN = 'GET_TRANSLATION'
const GET_SINGLETRANSLATION = 'GET_SINGLETRANSLATION'
const RESET_LOADING = 'RESET_LOADING'
const IS_TYPING = 'IS_TYPING'
const NEW_UNREAD = 'NEW_UNREAD'
const CLEAR_UNDREAD = 'CLEAR_UNREAD'
// ACTION CREATER
export const isTyping = bool => ({type: IS_TYPING, bool})
const transone = translated => ({type: GET_SINGLETRANSLATION, translated})
const resetLoading = () => ({
  type: RESET_LOADING
})
export const clearUnread = id => ({type: CLEAR_UNDREAD, id})
export const newUnread = user => ({type: NEW_UNREAD, user})
const transall = translated => ({type: GET_TRANSLATIONN, translated})
const getMessages = messages => ({type: GET_MESSAGES, messages})

export const postMessage = message => ({type: POST_MESSAGE, message})

export const getAllMessages = (id, otherId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/messages/${id}/${otherId}`)
    dispatch(getMessages(data))
  } catch (err) {
    console.error(err)
  }
}
export const translateAll = (messages, language) => async dispatch => {
  try {
    //console.log(messages)
    const {data} = await axios.post(`/api/translate/all`, {
      messages: messages,
      language: language
    })
    dispatch(transall(data))
  } catch (err) {
    console.err(err)
  }
}

export const postAMessage = (
  text,
  id,
  otherId,
  bool = false
) => async dispatch => {
  try {
    console.log('theses all correct post a message', {
      userId: id,
      senderId: otherId,
      bool: bool
    })
    const res = await axios.post(`/api/messages/${id}/${otherId}`, {
      text: text,
      bool: bool
    })
    dispatch(postMessage(res.data))
    socket.emit('new-message', res.data)
  } catch (err) {
    console.error(err.message, err.response)
  }
}
export const translateOne = (text, lan, messageId) => async dispatch => {
  try {
    dispatch(resetLoading())
    let res = await axios.post('/api/translate', {q: text, lan: lan})
    let translated = {messageId: messageId, text: res.data.translation}
    //console.log('in translateOne', translated)
    dispatch(transone(translated))
  } catch (err) {
    console.error(err.message, err.response)
  }
}

let defaultMessages = {
  messages: [],
  translate: {},
  loading: true,
  isTyping: false,
  translateAll: [],
  newUnread: []
}

export default function(state = defaultMessages, action) {
  switch (action.type) {
    case GET_MESSAGES:
      // console.log('in store, message.js, action.messages', action.messages)
      return {...state, messages: action.messages, loading: false}
    case POST_MESSAGE:
      // console.log('in message store about to add it in', action.message)
      return {...state, messages: [...state.messages, action.message]}
    case RESET_LOADING:
      return {...state, loading: true}
    case IS_TYPING:
      return {...state, isTyping: action.bool}
    case GET_SINGLETRANSLATION:
      state.translate[action.translated.messageId] = action.translated.text
      // console.log('in reducer, is the translater state right', state.translate)
      let newState = Object.assign(state, state)
      // console.log('the new state', newState)
      return {...newState, loading: false}
    case GET_TRANSLATIONN:
      return {...state, translateAll: action.translated}
    //console.log(action.translated)
    case NEW_UNREAD:
      return {...state, newUnread: [...state.newUnread, action.user]}
    case CLEAR_UNDREAD:
      return {
        ...state,
        newUnread: state.newUnread.filter(userId => userId !== action.id)
      }
    default:
      return state
  }
}
