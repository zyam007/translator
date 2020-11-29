//search for friend, thunk to get friend, change status(requested, confirmed, blocked, denied)
import React, {Component} from 'react'
import {fetchUser} from '../store/friend'
import {connect} from 'react-redux'

const defaultState = {
  email: '',
  note: ''
}

export class AddFriend extends Component {
  constructor() {
    super()
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
      this.props.fetchUser(this.state.email)
      this.setState(defaultState)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
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
    )
  }
}

const mapDispatch = dispatch => ({
  fetchUser: email => dispatch(fetchUser(email))
})

export default connect(null, mapDispatch)(AddFriend)
