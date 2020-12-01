import React from 'react'
import Messages from './messages'
import Conversation from './conversation'
import './main.css'
import {Link} from 'react-router-dom'
import {getConvo} from '../../store/reducers/convo'
import {connect} from 'react-redux'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getConvo(this.props.userId)
  }

  handleClick(event) {
    this.setState({
      selected: Number(event.target.value)
    })
  }
  render() {
    return (
      <div className="container">
        <div className="conversation">
          <Conversation
            otherInChat={this.props.otherInChat}
            handleClick={this.handleClick}
            selected={this.state.selected}
          />
        </div>
        {this.state.selected !== '' || undefined ? (
          <div className="messages">
            <Messages selected={this.state.selected} />
          </div>
        ) : (
          <p>Start a conversation by clicking on one of your friends' name!</p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    conversations: state.convo.conversations,
    otherInChat: state.convo.otherIC,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getConvo: id => dispatch(getConvo(id))
  }
}
export default connect(mapState, mapDispatch)(Main)
