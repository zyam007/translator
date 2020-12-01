import React from 'react'
//import '../../public/App.scss'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import {Nav, NavItem, Navbar, Container, NavDropdown} from 'react-bootstrap'
import Main from './mainComponent/main'

//landing page

export class Welcome extends React.Component {
  async componentDidMount() {}

  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        {isLoggedIn ? (
          // show links if user is logged in
          <div>
            <Main />
          </div>
        ) : (
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
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Welcome)
