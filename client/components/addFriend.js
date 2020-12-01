import React, {Component} from 'react'
import {
  fetchFriend,
  fetchAddFriend,
  resetError
} from '../store/reducers/findfriend'
import {connect} from 'react-redux'
import {Toast, Button, Container, Row, Col} from 'react-bootstrap'

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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      search: false,
      error: null
    })

    if (event.target.name == 'email') {
      this.props.resetError()
    }
  }

  async handleSearch(event) {
    event.preventDefault()
    try {
      this.props.fetchUser(this.state.email)
      await this.setState({
        // email: '',
        // intro: '',
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
      <Container>
        <Col />
        <Col>
          <form id="findFriend">
            <div>
              <h5>
                <label htmlFor="email">Search by Email</label>
              </h5>
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
                <Container>
                  <SearchFriend
                    email={this.state.email}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    intro={this.state.intro}
                    user={this.props.findFriend}
                    error={this.props.error}
                  />
                </Container>
              ) : (
                <div />
              )}
            </div>
          </form>
        </Col>
        <Col />
      </Container>
    )
  }
}

const mapState = state => {
  return {
    findFriend: state.findFriend.friend,
    error: state.findFriend.error,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  fetchFriend: email => dispatch(fetchFriend(email)),
  fetchAddFriend: (senderId, receiverId, intro) =>
    dispatch(fetchAddFriend(senderId, receiverId, intro)),
  resetError: () => dispatch(resetError())
})

export default connect(mapState, mapDispatch)(AddFriend)

const SearchFriend = props => {
  const {userName, email, profilePicture, language} = props.user || ''
  const state = {defaultState}
  if (props.error) {
    return (
      <div>
        <h4>
          Sorry, we couldn't find your friend! Try searching another email.
        </h4>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <h6>We found your friend: {userName}</h6>
          <div>{profilePicture}</div>
          <div>Language: {language}</div>
          <label htmlFor="text">Add a note to introduce yourself</label>
          <input
            type="text"
            name="intro"
            value={props.intro}
            onChange={props.handleChange}
            style={{height: '100px'}}
          />
          <Button type="submit" onClick={props.handleAdd}>
            Send Friend Request
          </Button>
        </div>
      </div>
    )
  }
}
