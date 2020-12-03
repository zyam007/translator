import io from 'socket.io-client'
import store from './store'
import {postMessage} from './store/reducers/message'
const socket = io(window.location.origin)
import {addOneToFrequest} from './store/reducers/userFriends'

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
    console.log(
      'in socket, want to print, newrequests',
      'this should be the target of the friend request',
      data,
      state.userFriends.newRequests
    )
    if (data.receiver.id === state.user.id) {
      store.dispatch(addOneToFrequest(data.sender))
      console.log(
        'the newRequest should now be not empty',
        state.userFriends.newRequests
      )
    }
  })
})

export default socket
