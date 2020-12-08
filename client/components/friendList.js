import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListGroup, Button, Tabs, Tab, Badge} from 'react-bootstrap'
import {
  fetchUserFriends,
  confirmFriend,
  deleteFriend
} from '../store/reducers/userFriends'

export class FriendList extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getFriends(this.props.user.id)
  }

  render() {
    const arr = this.props.userWithFriends.friendships || []
    const friends = this.props.userWithFriends.friends || []
    const newRequests = this.props.userWithFriends.newRequests || []
    const confirmed = this.props.userWithFriends.confirmed || []
    const requested = this.props.userWithFriends.requested || []
    const blocked = this.props.userWithFriends.blocked || []
    return (
      <>
        <h3>Your Friends</h3>
        <Tabs defaultActiveKey="friends" id="uncontrolled-tab-example">
          <Tab eventKey="friends" title="Friends">
            <ListGroup>
              {confirmed.map(friend => {
                return (
                  <ListGroup.Item
                    key={friend.id}
                    className="friends-list"
                    style={{display: 'flex'}}
                  >
                    <img src={friend.profilePicture} className="friends-img" />
                    <p style={{width: '200px'}}>{friend.userName}</p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() =>
                        this.props.requestUpdate(
                          this.props.user.id,
                          friend.id,
                          'block'
                        )
                      }
                    >
                      Block
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        this.props.delete(this.props.user.id, friend.id)
                      }
                    >
                      x
                    </Button>
                  </ListGroup.Item>
                )
              })}
              {blocked.map(friend => {
                return (
                  <ListGroup.Item
                    key={friend.id}
                    className="friends-list"
                    style={{display: 'flex'}}
                  >
                    <img src={friend.profilePicture} className="friends-img" />
                    <p style={{width: '200px'}}>{friend.userName}</p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() =>
                        this.props.requestUpdate(
                          this.props.user.id,
                          friend.id,
                          'block'
                        )
                      }
                    >
                      unBlock
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        this.props.delete(this.props.user.id, friend.id)
                      }
                    >
                      x
                    </Button>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Tab>
          <Tab eventKey="pending" title="Pending">
            <ListGroup>
              {requested.map(friend => {
                return (
                  <ListGroup.Item
                    key={friend.id}
                    className="friends-list"
                    style={{display: 'flex'}}
                  >
                    <img src={friend.profilePicture} className="friends-img" />
                    <p style={{width: '200px'}}>{friend.userName}</p>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() =>
                        this.props.delete(this.props.user.id, friend.id)
                      }
                    >
                      Cancel
                    </Button>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Tab>
          <Tab
            eventKey="requests"
            title={
              <React.Fragment>
                New Requests
                {newRequests.length ? (
                  <Badge variant="dark" className="new-requests-badge">
                    {newRequests.length}
                  </Badge>
                ) : (
                  <></>
                )}
              </React.Fragment>
            }
          >
            <ListGroup>
              {newRequests.map(friend => {
                return (
                  <ListGroup.Item
                    key={friend.id}
                    className="friends-list"
                    style={{display: 'flex'}}
                  >
                    <img src={friend.profilePicture} className="friends-img" />
                    <p style={{width: '200px'}}>{friend.userName}</p>
                    <Button
                      variant="outline-success"
                      onClick={() =>
                        this.props.requestUpdate(
                          this.props.user.id,
                          friend.id,
                          'accept'
                        )
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() =>
                        this.props.delete(this.props.user.id, friend.id)
                      }
                    >
                      Deny
                    </Button>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Tab>
        </Tabs>
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
    getFriends: userId => dispatch(fetchUserFriends(userId)),
    requestUpdate: (userId, friendId, action) =>
      dispatch(confirmFriend(userId, friendId, action)),
    delete: (userId, friendId) => dispatch(deleteFriend(userId, friendId))
  }
}

export default connect(mapState, mapDispatch)(FriendList)
