import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListGroup, Button, Tabs, Tab, Badge, Col} from 'react-bootstrap'
import {
  fetchUserFriends,
  confirmFriend,
  deleteFriend
} from '../store/reducers/userFriends'

export class FriendList extends Component {
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
      <div className="mt-3">
        <h3 className="ml-5">Your Friends</h3>
        <Tabs defaultActiveKey="friends" id="uncontrolled-tab-example">
          <Tab eventKey="friends" title="Friends">
            <ListGroup>
              {confirmed.map(friend => {
                return (
                  <ListGroup.Item
                    key={friend.id}
                    className="friends-list d-flex align-items-center"
                  >
                    <img
                      src={friend.profilePicture}
                      className="friends-img mr-2"
                    />
                    <span style={{width: '150px'}}>{friend.userName}</span>
                    <Button
                      className="mr-4"
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
                    className="friends-list d-flex align-items-center"
                    style={{display: 'flex'}}
                  >
                    <img
                      src={friend.profilePicture}
                      className="friends-img mr-2"
                    />
                    <span style={{width: '150px'}}>{friend.userName}</span>
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
                      className="ml-2"
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
                    className="friends-list d-flex align-items-center"
                  >
                    <img
                      src={friend.profilePicture}
                      className="friends-img mr-2"
                    />
                    <span style={{width: '150px'}}>{friend.userName}</span>
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
                    className="friends-list d-flex align-items-center"
                  >
                    <img
                      src={friend.profilePicture}
                      className="friends-img mr-2"
                    />
                    <span style={{width: '150px'}}>{friend.userName}</span>
                    <span
                      style={{width: '200px', fontSize: '12px'}}
                      className="mr-3 intro-msg"
                    >
                      {arr.map(person => {
                        if (person.senderId === friend.id) return person.intro
                      })}
                    </span>
                    <div className="d-flex" id="new-rq-btns">
                      <Button
                        className="mr-2 btn-accept"
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
                        className="mr-2"
                        variant="dark"
                        size="sm"
                        onClick={() =>
                          this.props.delete(this.props.user.id, friend.id)
                        }
                      >
                        Deny
                      </Button>
                    </div>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Tab>
        </Tabs>
      </div>
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
