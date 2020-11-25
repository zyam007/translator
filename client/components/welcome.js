import React from 'react'
import {Link} from 'react-router-dom'

//landing page
function Welcome() {
  return (
    <div>
      <h1>Translator Chat</h1>
      <h5>Connecting the world</h5>
      <nav>
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>
    </div>
  )
}

export default Welcome
