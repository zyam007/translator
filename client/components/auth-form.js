import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import {Button, Container, Row, Form, Col} from 'react-bootstrap'
import './auth-form.css'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container>
      <div>
        {props.name === 'login' ? (
          <Form onSubmit={handleSubmit} name={name}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <div>
              <Button variant="primary" type="submit">
                {displayName}
              </Button>
              {error && error.response && <div> {error.response.data} </div>}
              <br />
              <Link to="/signup">Not a member?</Link>
              <br />

              <a href="/auth/google">{displayName} with Google</a>
              <a href="/auth/facebook" className="fb connect">
                {displayName} with Facebook
              </a>
            </div>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit} name={name}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>

            <Form.Group controlId="formBasicuserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="userName"
                placeholder="Username"
                name="userName"
              />
            </Form.Group>

            <Form.Group controlId="formBasicLanguage">
              <Form.Label>Choose Your Language</Form.Label>
              <Form.Control as="select" name="language" type="language">
                <option value="ENG">ENG</option>
                <option value="SPA">SPA</option>
                <option value="RUS">RUS</option>
                <option value="CHI">CHI</option>
              </Form.Control>
            </Form.Group>

            <div>
              <Button variant="primary" type="submit">
                {displayName}
              </Button>
              {error && error.response && <div> {error.response.data} </div>}
              <br />
              <a href="/auth/google">{displayName} with Google</a>
              <a href="/auth/facebook" className="fb connect">
                {displayName} with Facebook
              </a>
            </div>
          </Form>
        )}
      </div>
    </Container>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}
const mapDispatchL = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

const mapDispatchS = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const userName = evt.target.userName.value
      const language = evt.target.language.value
      dispatch(auth(email, password, formName, userName, language))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchL)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchS)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
