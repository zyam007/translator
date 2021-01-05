import React from 'react'
//import '../../public/App.scss'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import {Nav, NavItem, Navbar, Container, NavDropdown} from 'react-bootstrap'
import {MDBRow, MDBCol, MDBIcon} from 'mdbreact'

export class NavBar extends React.Component {
  async componentDidMount() {}

  render() {
    const {profilePicture, userName} = this.props.user
    const {handleClick, isLoggedIn} = this.props
    return (
      <>
        <Navbar collapseOnSelect expand="md" id="navbar">
          {isLoggedIn ? (
            <Navbar.Brand href="/" style={{fontSize: '1rem'}}>
              <img src="logo3.png" alt="Translate" className="logo" />
              {/* <MDBIcon
                icon="angle-double-left"
                size="lg"
                style={{paddingRight: '10px'}}
              /> */}
              <span className="ml-3 nav-name">Chat Room</span>
            </Navbar.Brand>
          ) : (
            <Navbar.Brand href="/">
              <img src="logo3.png" alt="Translate" className="logo" />{' '}
            </Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end" style={{width: '100%'}}>
              {isLoggedIn ? (
                // show links if user is logged in
                <Nav className="right-navbar">
                  <NavItem>
                    <Link to="/addFriend" className="nav-name">
                      Find Friends
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/myprofile" className="nav-name userImg">
                      <img
                        src={profilePicture}
                        alt=""
                        className="profile-img nav"
                      />
                      <span className="ml-1">{userName}</span>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/" onClick={handleClick} className="nav-name">
                      Logout
                    </Link>
                  </NavItem>
                </Nav>
              ) : (
                <Nav>
                  <Link to="/aboutus" className="nav-name">
                    About Us
                  </Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
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

export default connect(mapState, mapDispatch)(NavBar)

/**
 * PROP TYPES
 */
NavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
