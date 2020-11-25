import React from 'react'
import Messages from './messages'
import Conversation from './conversation'
import './main.css'

function Main(props) {
  return (
    <div className="container">
      <div className="conversation">
        <Conversation />
      </div>
      <div className="messages">
        <Messages />
      </div>
    </div>
  )
}

export default Main
