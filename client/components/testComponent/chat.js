import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container} from 'react-bootstrap'
import Side from './side'
import Msg from './msg'
import {getConvo} from '../../store/reducers/convo'

export class Chatty extends Component {
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
    console.log('name is: ', event.target.value)

    this.setState({
      selected: event.target.value
    })
  }

  render() {
    return (
      <div className="d-flex" style={{height: '92vh'}}>
        <Side
          otherInChat={this.props.otherInChat}
          handleClick={this.handleClick}
          selected={this.state.selected}
          userLanguage={this.props.userLanguage}
        />
        {this.state.selected !== '' || undefined ? (
          <Msg selected={this.state.selected} />
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
    userLanguage: state.user.language
  }
}

const mapDispatch = dispatch => {
  return {
    getConvo: id => dispatch(getConvo(id))
  }
}
export default connect(mapState, mapDispatch)(Chatty)
