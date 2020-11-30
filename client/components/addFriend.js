//search for friend, thunk to get friend, change status(requested, confirmed, blocked, denied)
import React, {Component} from 'react'
import {fetchUser, fetchAddFriend} from '../store/reducers/friend'
import {connect} from 'react-redux'

const defaultState = {
  email: '',
  intro: ''
}

class AddFriend extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSearch(event) {
    event.preventDefault()
    try {
      this.props.fetchUser(this.state.email)
      this.setState(defaultState)
    } catch (error) {
      console.log(error)
    }
  }

  handleAdd(event) {
    event.preventDefault()
    try {
      this.props.fetchAddFriend(
        this.props.userId,
        this.props.friend.id,
        this.state.intro
      )
      alert('Friend request sent')
      this.setState(defaultState)
    } catch (error) {
      console.log(error)
    }
  }

  render(props) {
    const {userName, email, profilePicture, language} = this.props.friend || ''
    return (
      <form id="findFriend">
        <div>
          <label htmlFor="email">Search by Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button type="submit" onClick={this.handleSearch}>
            Search
          </button>
          {!userName && email ? (
            <div>
              <h4>
                Sorry, we couldn't find your friend! Try searching another
                email.
              </h4>
            </div>
          ) : (
            <div />
          )}
          {userName && email ? (
            <div>
              <div>We found your friend: {userName}</div>
              <div>{profilePicture}</div>
              <div>Language:{language}</div>
              <label htmlFor="text">Add a note to introduce yourself</label>
              <input
                type="text"
                name="intro"
                value={this.state.name}
                onChange={this.handleChange}
                style={{height: '100px'}}
              />
              <button type="submit" onClick={this.handleAdd}>
                Send Friend Request
              </button>
            </div>
          ) : (
            <div />
          )}
        </div>
      </form>
    )
  }
}

const mapState = state => {
  return {
    friend: state.friend,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  fetchUser: email => dispatch(fetchUser(email)),
  fetchAddFriend: (senderId, receiverId, intro) =>
    dispatch(fetchAddFriend(senderId, receiverId, intro))
})

export default connect(mapState, mapDispatch)(AddFriend)
