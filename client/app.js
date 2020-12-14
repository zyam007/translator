import React from 'react'
import {NavBar} from './components'
import Routes from './routes'
//import '../public/App.scss'
import 'bootstrap/dist/css/bootstrap.css'
import {usePageVisibility} from './visibility'
import socket from './socket'
import {connect} from 'react-redux'

const App = props => {
  const isVisible = usePageVisibility()
  if (isVisible && props.isLoggedIn) {
    socket.emit('active', props.user)
  } else if (!isVisible) {
    socket.emit('inActive', props.user)
  }
  return (
    <>
      <NavBar />
      <Routes />
    </>
  )
}
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    user: state.user
  }
}
export default connect(mapState)(App)

// export default App
