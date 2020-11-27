import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Nav, NavItem, Navbar as BootstrapNavbar} from 'react-bootstrap'

export class Navbar extends React.Component {
  async componentDidMount() {}

  render() {
    const {handleClick, isLoggedIn} = this.props
    return (
      <>
        <BootstrapNavbar variant="light" bg="dark" expand="lg" id="flex">
          <Link to="/">
            <img src="" alt="Translate" className="logo" />
          </Link>
          <Nav>
            {isLoggedIn ? (
              <div>
                <Nav>
                  {/* The navbar will show these links after you log in */}
                  <NavItem>
                    <Link to="/" className="nav-name">
                      Home
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/myaccount" className="nav-name">
                      My Account
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/" onClick={handleClick} className="nav-name">
                      Logout
                    </Link>
                  </NavItem>

                  {this.props.user.isAdmin ? (
                    <>
                      <NavItem>
                        <Link to="/admin/edit-user" className="nav-name">
                          Placeholder
                        </Link>
                      </NavItem>
                    </>
                  ) : (
                    ''
                  )}
                  <NavItem className="center" />
                </Nav>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Nav>
                  <NavItem>
                    <Link to="/" className="nav-name">
                      Home
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/myprofile" className="nav-name">
                      My Account
                    </Link>
                  </NavItem>
                  <NavItem className="center" />
                </Nav>
              </div>
            )}
          </Nav>
        </BootstrapNavbar>
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
