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
    <div className="col d-flex justify-content-center">
      <Card style={{width: '30rem'}} className="auth">
        <Card.Img variant="top" src="img/logo.png" className="cardImg" />
        <Card.Body className="card-block text-center">
          {props.name === 'login' ? (
            <Form onSubmit={handleSubmit} name={name}>
              <Row className="justify-content-md-center">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                {displayName}
              </Button>
              {error && error.response && <div> {error.response.data} </div>}

              <br />
              <Row>
                <Col className="justify-content-md-center">
                  <Link to="/signup">Not a member? Sign up Now!</Link>
                </Col>
              </Row>
              <br />
              <Row>
                <p style={{paddingLeft: '20px'}}>
                  or you can {displayName} with :{' '}
                </p>
              </Row>
              <Row>
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
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Form.Group controlId="formBasicuserName">
                  <Form.Control
                    type="userName"
                    placeholder="Username"
                    name="userName"
                  />
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
                <Form.Group controlId="formBasicLanguage">
                  <Form.Label>Choose Your Language</Form.Label>
                  <Form.Control as="select" name="language" type="language">
                    <option value="ENG">ENG</option>
                    <option value="SPA">SPA</option>
                    <option value="RUS">RUS</option>
                    <option value="CHI">CHI</option>
                  </Form.Control>
                </Form.Group>
              </Row>
              <div>
                <Button variant="primary" type="submit">
                  {displayName}
                </Button>
                {error && error.response && <div> {error.response.data} </div>}
                <br />
                <Row>
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
              </div>
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
