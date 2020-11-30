import React from 'react'
import {Link} from 'react-router-dom'
import './convo.css'

function Conversation(props) {
  if (props.otherInChat == []) {
    return (
      <div>
        <p>loading</p>
      </div>
    )
  }
  return (
    <div className="convo-container overflow-wrapper">
      <div className="headind_srch">
        <div className="stylish-input-group">
          <Link to="/">
            <button className="button search-bar" type="button">
              Find Friend To Chat!
            </button>
          </Link>
          <div className="recent_heading">
            <h4>Recent</h4>
          </div>
        </div>
      </div>
      <ul>
        {props.otherInChat.map(user => {
          return (
            <li
              key={user.id}
              className={props.selected == user.id ? 'highlight' : 'convo'}
              value={user.id}
              onClick={props.handleClick}
            >
              <img src={user.profilePicture} className="img" />
              {user.userName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Conversation
