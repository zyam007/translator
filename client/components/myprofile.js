import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAmazonPay} from '@fortawesome/free-brands-svg-icons'
import {faAt} from '@fortawesome/free-solid-svg-icons'

export class MyProfile extends Component {
  render() {
    const img =
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    return (
      <div>
        <h1>My Profile</h1>
        <h3>Name</h3>
        <img src={img} alt="" className="profile-img" />
        <div>
          <FontAwesomeIcon icon={faAt} style={{fontSize: '50px'}} />
          <p>youremail@gmail.com</p>
        </div>
        <h3>Native Language</h3>
        <Button variant="secondary">Friends</Button>
        <FontAwesomeIcon icon={faAmazonPay} style={{fontSize: '50px'}} />
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(MyProfile)
