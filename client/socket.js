import io from 'socket.io-client'
import store from './store'
import {postMessage} from './store/message'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('new-message', message => {
    console.log('i am in socket client, whats the message', message)
    store.dispatch(postMessage(message))
  })
})

export default socket
