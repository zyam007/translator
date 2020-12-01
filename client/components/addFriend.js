//search for friend, thunk to get friend, change status(requested, confirmed, blocked, denied)
import React, {Component} from 'react'
import {fetchUser, fetchAddFriend} from '../store/reducers/findfriend'
import {connect} from 'react-redux'
import Toast from 'react-bootstrap/Toast'

const defaultState = {
  email: '',
  intro: '',
  search: false
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

  async handleSearch(event) {
    event.preventDefault()
    try {
      this.props.fetchUser(this.state.email)
      console.log(this.props.findFriend)
      console.log(this.props.error)
      await this.setState({
        // email: '',
        // intro: '',
        search: true
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
        this.props.friend.id,
        this.state.intro
      )
      this.setState(defaultState)
    } catch (error) {
      console.log(error)
    }
  }

  render(props) {
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
          {this.state.email && this.state.search ? (
            <SearchFriend
              email={this.state.email}
              handleChange={this.handleChange}
              handleAdd={this.handleAdd}
              intro={this.state.intro}
              user={this.props.findFriend}
              error={this.props.error}
            />
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
    findFriend: state.findFriend.user,
    error: state.findFriend.error,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  fetchUser: email => dispatch(fetchUser(email)),
  fetchAddFriend: (senderId, receiverId, intro) =>
    dispatch(fetchAddFriend(senderId, receiverId, intro))
})

export default connect(mapState, mapDispatch)(AddFriend)

const SearchFriend = props => {
  const {userName, email, profilePicture, language} = props.user || ''
  return (
    <div>
      {props.error ? (
        <div>
          <h4>
            Sorry, we couldn't find your friend! Try searching another email.
          </h4>
        </div>
      ) : (
        <div>
          <div>We found your friend: {userName}</div>
          <div>{profilePicture}</div>
          <div>Language:{language}</div>
          <label htmlFor="text">Add a note to introduce yourself</label>
          <input
            type="text"
            name="intro"
            value={props.intro}
            onChange={props.handleChange}
            style={{height: '100px'}}
          />
          <button type="submit" onClick={props.handleAdd}>
            Send Friend Request
          </button>
        </div>
      )}
    </div>
  )
}
