import React from 'react'
import './convo.css'
const user1 = {
  id: 1,
  userName: 'Jamie'
}
const user2 = {
  id: 2,
  userName: 'Jenna'
}
const user3 = {
  id: 3,
  userName: 'Jason'
}
const users = [user1, user2, user3]
function conversation(props) {
  return (
    <ul className="convo-container">
      {users.map(user => {
        return (
          <li key={user.id} className="convo">
            {user.userName}
          </li>
        )
      })}
    </ul>
  )
}

export default conversation
