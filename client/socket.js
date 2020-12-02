import io from 'socket.io-client'
import store from './store'
import {postMessage} from './store/reducers/message'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('new-message', message => {
    let state = store.getState()
    if (state.user.id === message.receiverId) {
      store.dispatch(postMessage(message))
    }
  })
})

export default socket
