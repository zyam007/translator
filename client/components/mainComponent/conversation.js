import React from 'react'

import './convo.css'

function Conversation(props) {
  return (
    <ul className="convo-container">
      {props.otherInChat.map(user => {
        return (
          <li
            key={user.id}
            className="convo"
            value={user.id}
            onClick={props.handleClick}
          >
            {user.userName}
          </li>
        )
      })}
    </ul>
  )
}

export default Conversation
