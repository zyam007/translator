import React from 'react'
//import '../../public/App.scss'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import {Nav, NavItem, Navbar, Container, NavDropdown} from 'react-bootstrap'
import Main from './mainComponent/main'
import {Button} from 'react-bootstrap'
//landing page

export class Welcome extends React.Component {
  async componentDidMount() {}

  render() {
    const {isLoggedIn} = this.props
    return (
      <div className="main-container">
        {isLoggedIn ? (
          // show links if user is logged in
          <div>
            <Main />
          </div>
        ) : (
          <div className="main-banner">
            <h1 id="app-title">Chat Made Easy</h1>
            <p id="animate">
              <span className="text-change" />
            </p>

            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              <Button className="btn-left" variant="secondary">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-right" variant="warning">
                Sign Up
              </Button>
            </Link>
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
