import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Col, ListGroup, Button} from 'react-bootstrap'
import {fetchUserFriends} from '../store/reducers/userFriends'
//import '../../public/App.scss'

export class FriendList extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getFriends(this.props.user.id)
  }

  render() {
    const friendsList = this.props.userWithFriends.friends || []
    return (
      <>
        <h3>Your Friends</h3>
        <ListGroup>
          {friendsList.map(friend => {
            return (
              <ListGroup.Item
                key={friend.id}
                className="friends-list"
                style={{display: 'flex'}}
              >
                <img src={friend.profilePicture} style={{width: '20px'}} />
                <span>{friend.email}</span>
                <span>status: {friend.friendship.status}</span>
                <Button variant="outline-danger" size="sm">
                  Block
                </Button>
                <Button variant="danger" size="sm">
                  x
                </Button>
              </ListGroup.Item>
            )
          })}
          {/* <ListGroup.Item>
            <span>Friend1</span>
            <Button variant="outline-danger" size="sm">
              Block
            </Button>
            <Button variant="danger" size="sm">
              x
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Friend2</span>
            <Button variant="outline-danger" size="sm">
              Block
            </Button>
            <Button variant="danger" size="sm">
              x
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Friend3</span>
            <Button variant="outline-danger" size="sm">
              Block
            </Button>
            <Button variant="danger" size="sm">
              x
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Friend4</span>
            <Button variant="outline-danger" size="sm">
              Block
            </Button>
            <Button variant="danger" size="sm">
              x
            </Button>
          </ListGroup.Item> */}
        </ListGroup>
      </>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    userWithFriends: state.userFriends
  }
}

const mapDispatch = dispatch => {
  return {
    getFriends: userId => dispatch(fetchUserFriends(userId))
  }
}

export default connect(mapState, mapDispatch)(FriendList)
