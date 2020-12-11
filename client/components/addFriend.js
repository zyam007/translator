import React, {Component} from 'react'
import {
  fetchFriend,
  fetchAddFriend,
  resetError
} from '../store/reducers/findfriend'
import {fetchUserFriends} from '../store/reducers/userFriends'
import {connect} from 'react-redux'
import {Button, Container, Col, Row, Form, Card} from 'react-bootstrap'
import SearchFriend from './searchFriend'

const defaultState = {
  email: '',
  intro: '',
  search: false,
  error: null
}

class AddFriend extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }
  componentDidMount() {
    this.props.getFriends(this.props.userId)
    this.props.resetError()
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      search: false,
      error: null
    })

    if (event.target.name === 'email') {
      this.props.resetError()
    }
  }

  async handleSearch(event) {
    event.preventDefault()
    try {
      this.props.fetchFriend(this.state.email)
      await this.setState({
        search: true,
        error: this.props.error
      })
    } catch (error) {
      console.log(error)
    }
  }
  handleAdd(event) {
    event.preventDefault()
    try {
      this.props.fetchAddFriend(
        this.props.userId,
        this.props.findFriend.id,
        this.state.intro
      )
      alert('Your friend request was sent')
      this.setState(defaultState)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Container
        className="col d-flex justify-content-center"
        style={{marginTop: '20px'}}
      >
        <form id="findFriend">
          <div>
            <Card.Title>
              <label htmlFor="email">Search by Email</label>
            </Card.Title>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Button type="submit" onClick={this.handleSearch}>
              Search
            </Button>
            {this.props.error !== 'pending' ? (
              <Card style={{width: '30rem'}} className="auth">
                <SearchFriend
                  email={this.state.email}
                  handleChange={this.handleChange}
                  handleAdd={this.handleAdd}
                  intro={this.state.intro}
                  user={this.props.findFriend}
                  error={this.props.error}
                  userId={this.props.userId}
                  userWithFriends={this.props.userWithFriends}
                />
              </Card>
            ) : (
              <div />
            )}
          </div>
        </form>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    userWithFriends: state.userFriends,
    findFriend: state.findFriend.friend,
    error: state.findFriend.error
  }
}

const mapDispatch = dispatch => {
  return {
    getFriends: userId => dispatch(fetchUserFriends(userId)),
    fetchFriend: email => dispatch(fetchFriend(email)),
    fetchAddFriend: (senderId, receiverId, intro) =>
      dispatch(fetchAddFriend(senderId, receiverId, intro)),
    resetError: () => dispatch(resetError())
  }
}

export default connect(mapState, mapDispatch)(AddFriend)
