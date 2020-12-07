import React, {Component} from 'react'
//import '../../public/App.scss'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Container, Row, Col, Modal} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faGlobe} from '@fortawesome/free-solid-svg-icons'
import {updateUser} from '../store/reducers/user'
import {UpdateForm} from './index.js'

export class MyProfile extends Component {
  constructor() {
    super()
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      show: false
    }
  }

  handleClose() {
    this.setState({show: false})
  }

  handleShow() {
    this.setState({show: true})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const {id} = this.props.user
    const userName = evt.target.userName.value
    const profilePicture = evt.target.profilePicture.value
    const language = evt.target.language.value
    this.props.update_User({id, userName, profilePicture, language})
    this.setState({show: false})
  }

  render() {
    const {profilePicture, email, language, userName} = this.props.user

    return (
      <div className="main-profile">
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UpdateForm
              handleSubmit={this.handleSubmit}
              userName={userName}
              profilePicture={profilePicture}
              language={language}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Container fluid="md">
          <h1>My Profile</h1>
          <Row>
            <Col>
              <img
                src={profilePicture}
                alt="user photo"
                className="profile-photo"
              />
              <p>Joined Aug 2020</p>
              <Link to="/friendlist">
                <Button>Friends</Button>
              </Link>
            </Col>
            <Col xs={8} className="profile-info">
              <Row>
                <p>Username: {userName}</p>
              </Row>
              <Row className="profile-email">
                <FontAwesomeIcon icon={faEnvelope} style={{fontSize: '15px'}} />
                <span className="email-line">{email}</span>
              </Row>
              <Row className="profile-language">
                <FontAwesomeIcon icon={faGlobe} style={{fontSize: '15px'}} />
                <span className="language-line">{language}</span>
              </Row>
              <Row>
                <Button className="btn-update" onClick={this.handleShow}>
                  Update Profile
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    update_User: user => dispatch(updateUser(user))
  }
}

export default connect(mapState, mapDispatch)(MyProfile)
