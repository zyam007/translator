import io from 'socket.io-client'
import store from './store'
import {postMessage} from './store/reducers/message'
const socket = io(window.location.origin)
import {addOneToFrequest} from './store/reducers/userFriends'
import {isTyping} from './store/reducers/message'
import {newUnread} from './store/reducers/message'
import addNotification from 'react-push-notification'
import {markInactive, markActive} from './store/reducers/convo'

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('new-message', message => {
    let state = store.getState()
    if (state.user.id === message.receiverId) {
      store.dispatch(postMessage(message))

      //message userId is the person that sent the message
      if (
        state.message.newUnread.filter(userId => userId == message.userId)
          .length == 0
      ) {
        store.dispatch(newUnread(message.userId))
      }
      //push notification
      addNotification({
        title: 'New Message from your Chatty App',
        message: `${message.text}`,
        theme: 'light',
        duration: 8000,
        native: true // when using native, your OS will handle theming.
      })
    }
  })
  socket.on('active', id => {
    if (id) {
      store.dispatch(markActive(Number(id)))
    }
  })
  socket.on('inActive', id => {
    if (id) {
      store.dispatch(markInactive(Number(id)))
    }
  })
  socket.on('new-friend', data => {
    let state = store.getState()
    if (data.receiver.id === state.user.user.id) {
      store.dispatch(addOneToFrequest(data.sender))
    }
  })
  socket.on('user typing', data => {
    let state = store.getState()
    console.log('user is typing. socket', data)
    if (
      data.receiverId === state.user.id &&
      state.message.isTyping !== data.isTyping
    ) {
      store.dispatch(isTyping(data.isTyping))
    }
  })
})

export default socket
