//search for friend, thunk to get friend, change status(requested, confirmed, blocked, denied)
import React, {Component} from 'react'
import {fetchUser, fetchAddFriend} from '../store/friend'
import {connect} from 'react-redux'

const defaultState = {
  email: '',
  note: ''
}

class AddFriend extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
      // if () {
      this.props.fetchUser(this.state.email)
      // } else {
      // 	this.props.fetchAddFriend(this.state.userId, this.state.email, this.state.note)
      // }
      this.setState(defaultState)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {email} = this.props
    return (
      // { (!email) ? (
      // 	<form id="findFriend" onSubmit={this.handleSubmit}>
      // <div>
      // 	<label htmlFor="email">Search by Email</label>
      // 	<input
      // 		type="text"
      // 		name="email"
      // 		value={this.state.email}
      // 		onChange={this.handleChange}
      // 	/>
      // 	<button type="submit">Search</button>
      // 	</div>
      // </form>
      // 	) : (
      <form id="findFriend" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">Search by Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
          <h4>We found your friend: {this.props.userName}</h4>
          <div>{this.props.profilePicture}</div>
          <div>Language:{this.props.language}</div>
          <label htmlFor="text">Add a note to introduce yourself</label>
          <input
            type="text"
            name="email"
            value={this.state.name}
            onChange={this.handleChange}
            style={{height: '100px'}}
          />
          <button type="submit">Send Friend Request</button>
        </div>
      </form>
      // 			)}
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    email: state.user.email,
    userName: state.user.userName,
    profilePicture: state.user.profilePicture,
    language: state.user.language
  }
}

const mapDispatch = dispatch => ({
  fetchUser: email => dispatch(fetchUser(email)),
  fetchAddFriend: (userId, email, note) =>
    dispatch(fetchAddFriend(userId, email, note))
})

export default connect(null, mapDispatch)(AddFriend)
