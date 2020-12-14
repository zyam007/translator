import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import {Button, Container, Row, Form, Col, Card} from 'react-bootstrap'
import './auth-form.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div
      className="col d-flex justify-content-center"
      style={{marginTop: '20px'}}
    >
      <Card style={{width: '30rem'}} className="auth">
        <Card.Body className="card-block text-center">
          <Card.Img
            variant="top"
            src="/logo3.png"
            alt="no logo"
            style={{width: '20%', marginRight: 'auto', marginLeft: 'auto'}}
          />
          <Card.Title>Chatty Polyglot</Card.Title>
          {props.name === 'login' ? (
            <Form onSubmit={handleSubmit} name={name}>
              <Row className="justify-content-md-center">
                <Form.Group controlId="formBasicEmail" style={{width: '80%'}}>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Form.Group
                  controlId="formBasicPassword"
                  style={{width: '80%'}}
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Button
                  variant="secondary"
                  type="submit"
                  style={{width: '80%'}}
                >
                  {displayName}
                </Button>

                {error && error.response && <div> {error.response.data} </div>}
              </Row>

              <Row className="justify-content-md-center">
                <div>
                  Not a member?{' '}
                  <Link to="/signup">
                    <span>Sign up Now!</span>{' '}
                  </Link>
                </div>
              </Row>

              <Row className="justify-content-md-center">
                <div>or you can {displayName} with : </div>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{marginTop: '-30px'}}
              >
                <Col md="auto">
                  <a href="/auth/google">
                    <FontAwesomeIcon icon={faGoogle} size="2x" />
                  </a>
                </Col>
                <Col md="auto">
                  <a href="/auth/facebook">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                </Col>
              </Row>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit} name={name}>
              <Row className="justify-content-md-center">
                <Form.Group controlId="formBasicEmail" style={{width: '80%'}}>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Form.Group
                  controlId="formBasicPassword"
                  style={{width: '80%'}}
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Form.Group
                  controlId="formBasicuserName"
                  style={{width: '80%'}}
                >
                  <Form.Control
                    type="userName"
                    placeholder="Username"
                    name="userName"
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Form.Group
                  controlId="formBasicLanguage"
                  style={{width: '80%', marginTop: '-20px'}}
                >
                  <Form.Label>Choose Your Language</Form.Label>
                  <Form.Control as="select" name="language" type="language">
                    <option value="ENG">English </option>
                    <option value="ARA">Arabic</option>
                    <option value="CHI">Chinese</option>
                    <option value="FIL">Filipino</option>
                    <option value="FRE">French</option>
                    <option value="HIN">Hindi</option>
                    <option value="JAP">Japanese</option>
                    <option value="KOR">Korean</option>
                    <option value="RUS">Russian</option>
                    <option value="SPA">Spanish</option>
                  </Form.Control>
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Button variant="warning" type="submit" style={{width: '80%'}}>
                  {displayName}
                </Button>

                {error && error.response && <div> {error.response.data} </div>}
              </Row>

              <Row className="justify-content-md-center">
                <div>
                  Already a member?{' '}
                  <Link to="/login">
                    <span>Log in!</span>{' '}
                  </Link>
                </div>
              </Row>

              <Row className="justify-content-md-center">
                <div>or you can {displayName} with : </div>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{marginTop: '-30px'}}
              >
                <Col md="auto">
                  <a href="/auth/google">
                    <FontAwesomeIcon icon={faGoogle} size="2x" />
                  </a>
                </Col>
                <Col md="auto">
                  <a href="/auth/facebook">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                </Col>
              </Row>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
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
