import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container} from 'react-bootstrap'
import Conversation from './conversation'
import Messages from './messages'
import {getConvo} from '../../store/reducers/convo'
import {clearUnread} from '../../store/reducers/message'
export class Main extends Component {
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
      selected: event.target.value
    })
  }
  componentDidUpdate(prevState) {
    console.log('in com did update')
    if (prevState.selected !== this.state.selected) {
      console.log(
        'in main, component did update, does prev prop newunread',
        this.props.newUnread,
        'include this.selected?',
        this.state.selected
      )
      if (this.props.newUnread.includes(this.state.selected)) {
        this.props.clearUnread(this.state.selected)
      }
    }
  }
  render() {
    console.log(
      ' is this the one I am looking for ???',
      this.props.otherInChat || []
    )
    return (
      <div className="d-flex" style={{height: '93vh'}}>
        <Conversation
          otherInChat={this.props.otherInChat}
          handleClick={this.handleClick}
          selected={this.state.selected}
          newUnread={this.props.newUnread}
        />
        {this.state.selected !== '' || undefined ? (
          <Messages selected={this.state.selected} />
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
    userId: state.user.id,
    newUnread: state.message.newUnread
  }
}

const mapDispatch = dispatch => {
  return {
    getConvo: id => dispatch(getConvo(id)),
    clearUnread: id => dispatch(clearUnread(id))
  }
}
export default connect(mapState, mapDispatch)(Main)
