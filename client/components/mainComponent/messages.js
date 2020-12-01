import React from 'react'
import Input from './input'
import './message.css'
import {
  getAllMessages,
  postAMessage,
  translateOne
} from '../../store/reducers/message'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import socket from '../../socket'

class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      showTrans: false,
      translate: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.translate = this.translate.bind(this)
  }
  componentDidMount() {
    let selected = this.props.selected
    this.props.getAllMessages(this.props.userId, selected)
  }
  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.props.getAllMessages(this.props.userId, this.props.selected)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.translate !== nextProps.translate) {
      this.setState({
        translate: this.props.translate
      })
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postAMessage(
      this.state.value,
      this.props.userId,
      this.props.selected
    )
    this.setState({
      value: ''
    })
  }
  // switch to the store
  async translate(text, lan, messageId) {
    try {
      this.props.translateOne(text, lan, messageId)
      await this.setState({
        showTrans: true,
        translate: this.props.translate
      })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    if (this.props.loading == true) {
      return (
        <div>
          <p>Loading messages...Please wait</p>
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        </div>
      )
    }
    return (
      <div>
        <ul
          className="list"
          style={{minHeight: '100%', height: '100%'}}
          className="overflow-wrapper"
        >
          {this.props.messages.map(message => {
            return (
              <div key={message.id}>
                <li
                  className={
                    'messages' +
                    (message.receiverId == this.props.userId
                      ? 'receiver'
                      : 'sender')
                  }
                >
                  {message.text}
                </li>
                {this.state.translate[message.id] ? (
                  <li
                    className={
                      'messages' +
                      (message.receiverId == this.props.userId
                        ? 'receiver'
                        : 'sender')
                    }
                  >
                    {this.state.translate[message.id]}
                  </li>
                ) : (
                  <div />
                )}
                <button
                  onClick={() => {
                    this.translate(
                      message.text,
                      this.props.user.language,
                      message.id
                    )
                  }}
                >
                  translate to your language
                </button>
              </div>
            )
          })}
        </ul>
        <div
          style={{
            bottom: '0px'
          }}
        >
          <Input
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            value={this.state.value}
          />
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
    userId: state.user.id,
    user: state.user,
    messages: state.message.messages,
    translate: state.message.translate,
    loading: state.message.loading
  }
}

const mapDispatch = dispatch => {
  return {
    getAllMessages: (id, otherId) => dispatch(getAllMessages(id, otherId)),
    postAMessage: (text, senderId, receiverId) =>
      dispatch(postAMessage(text, senderId, receiverId)),
    translateOne: (text, lan, messageId) =>
      dispatch(translateOne(text, lan, messageId))
  }
}
export default connect(mapState, mapDispatch)(Messages)
