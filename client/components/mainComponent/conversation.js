import React from 'react'

import './convo.css'

function Conversation(props) {
  if (props.otherInChat == []) {
    return (
      <div>
        <p>loading</p>
      </div>
    )
  }
  console.log(
    '---!in convo',
    props.otherInChat[0],
    'selected',
    typeof props.selected
  )
  return (
    <ul className="convo-container">
      {props.otherInChat.map(user => {
        return (
          <li
            key={user.id}
            className={props.selected == user.id ? 'highlight' : 'convo'}
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
