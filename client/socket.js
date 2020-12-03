import io from 'socket.io-client'
import store from './store'
import {postMessage} from './store/reducers/message'
const socket = io(window.location.origin)
import {addOneToFrequest} from './store/reducers/userFriends'
import {isTyping} from './store/reducers/message'
socket.on('connect', () => {
  console.log('Connected!')

  socket.on('new-message', message => {
    let state = store.getState()
    if (state.user.id === message.receiverId) {
      store.dispatch(postMessage(message))
    }
  })
  socket.on('new-friend', data => {
    let state = store.getState()
    if (data.receiver.id === state.user.id) {
      store.dispatch(addOneToFrequest(data.sender))
    }
  })
  socket.on('user typing', data => {
    let state = store.getState()
    if (data.receiverId === state.user.id) {
      console.log('in client socket', data)
      store.dispatch(isTyping(data.isTyping))
    }
  })
})

export default socket
