/* eslint-disable */
import React, {Component} from 'react'
import {
  getAllMessages,
  postAMessage,
  translateOne,
  translateAll
} from '../../store/reducers/message'
import {fetchUserFriends} from '../../store/reducers/userFriends'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import socket from '../../socket'
import LoadingView from '../loadingView'
import {
  Alert,
  Button,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Overlay,
  Popover,
  PopoverTitle
} from 'react-bootstrap'
import Input from './input'
import './message.css'

export class Messages extends Component {
  constructor(props) {
    super(props)
    this.lastMsgRef = React.createRef()
    this.state = {
      value: '',
      showTrans: false,
      toggleMemes: false,
      translate: {},
      toggleColor: false,
      background: '#ffffff'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.translate = this.translate.bind(this)
    this.toggleShowTrans = this.toggleShowTrans.bind(this)
    this.handleGIPHY = this.handleGIPHY.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleVoiceOnChange = this.handleVoiceOnChange.bind(this)
    this.toggle2 = this.toggle2.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
  }

  componentDidMount() {
    let selected = this.props.selected
    this.props.getAllMessages(this.props.userId, selected)
    this.props.getFriends(this.props.userId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.props.getAllMessages(this.props.userId, this.props.selected)
      this.setState({
        value: '',
        toggleMemes: false,
        showTrans: false
      })
    }
    if (this.props.messages !== prevProps.messages) {
      this.props.translateAll(this.props.messages, this.props.user.language)
    }
    if (this.props.messages !== prevProps.messages) {
      this.props.translateAll(this.props.messages, this.props.user.language)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.translate !== nextProps.translate) {
      this.setState({
        translate: this.props.translate
      })
    }
    if (this.lastMsgRef.current) {
      this.lastMsgRef.current.scrollIntoView()
    }
  }

  handleVoiceOnChange(voice) {
    this.setState({value: voice})
    let bool = true
    socket.emit('user typing', {
      typerId: this.props.userId,
      receiverId: this.props.selected,
      isTyping: bool
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value})
    let bool = false
    event.target.value !== '' ? (bool = true) : (bool = false)
    socket.emit('user typing', {
      typerId: this.props.userId,
      receiverId: this.props.selected,
      isTyping: bool
    })
  }

  handleSubmit(event) {
    if (this.state.value.trim() !== '') {
      event.preventDefault()
      this.props.postAMessage(
        this.state.value,
        this.props.userId,
        this.props.selected
      )
      this.setState({
        value: ''
      })
      socket.emit('user typing', {
        typerId: this.props.userId,
        receiverId: this.props.selected,
        isTyping: false
      })
    }
  }

  toggleShowTrans() {
    let {showTrans} = this.state
    this.setState({
      showTrans: !showTrans
    })
  }

  toggle() {
    this.setState(prevState => ({toggleMemes: !prevState.toggleMemes}))
  }
  toggle2() {
    this.setState(prevState => ({toggleColor: !prevState.toggleColor}))
  }
  // switch to the store
  async translate(text, lan, messageId) {
    try {
      this.props.translateOne(text, lan, messageId)
      let {showTrans} = this.state
      await this.setState({
        showTrans: !showTrans,
        translate: this.props.translate
      })
    } catch (err) {
      console.error(err)
    }
  }
  handleGIPHY(gif) {
    this.props.postAMessage(
      gif.downsized.url,
      this.props.userId,
      this.props.selected,
      true
    )
    this.toggle()
  }

  handleChangeColor = color => {
    this.setState({background: color.hex})
  }

  render() {
    if (this.props.loading) {
      return <LoadingView />
    }

    const blocked = this.props.blocked || []

    const translated = this.props.translateall

    return (
      <div className="d-flex flex-column flex-grow-1">
        <Alert className="mb-0" variant="info">
          {this.props.title}
        </Alert>
        <div
          className="flex-grow-1 overflow-auto"
          style={{backgroundColor: `${this.state.background}`}}
        >
          <div className="d-flex flex-column align-items-start justify-content-end ">
            {translated &&
              translated.translation &&
              translated.translation.map((message, index) => {
                const lastMsg = translated.translation.length - 1 === index
                return (
                  <div
                    ref={lastMsg ? this.lastMsgRef : null}
                    key={message.id}
                    style={{maxWidth: '80%'}}
                    className={`my-1 d-flex flex-column ${
                      message.receiverId === this.props.userId
                        ? 'align-items-start'
                        : 'align-self-end align-items-end'
                    }`}
                  >
                    {this.state.showTrans ? (
                      <div
                        className={
                          'messages' +
                          (message.receiverId === this.props.userId
                            ? 'receiver'
                            : 'sender') +
                          (message.isImage ? 'img' : '')
                        }
                      >
                        {message.isImage ? (
                          <OverlayTrigger
                            key="placement"
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-top">
                                {message.translation}
                              </Tooltip>
                            }
                          >
                            <img src={message.URL} className="img-gif" />
                          </OverlayTrigger>
                        ) : (
                          message.translation
                        )}
                      </div>
                    ) : (
                      <div
                        className={
                          'messages' +
                          (message.receiverId === this.props.userId
                            ? 'receiver'
                            : 'sender') +
                          (message.isImage ? 'img' : '')
                        }
                      >
                        {message.isImage ? (
                          <OverlayTrigger
                            key="placement"
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-top">
                                {message.translation}
                              </Tooltip>
                            }
                          >
                            <img src={message.URL} className="img-gif" />
                          </OverlayTrigger>
                        ) : (
                          message.text
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
        <Input
          handleVoiceOnChange={this.handleVoiceOnChange}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          value={this.state.value}
          handleGIPHY={this.handleGIPHY}
          toggleMemes={this.state.toggleMemes}
          toggleColor={this.state.toggleColor}
          background={this.state.background}
          toggle={this.toggle}
          toggle2={this.toggle2}
          handleChangeColor={this.handleChangeColor}
          toggleShowTrans={this.toggleShowTrans}
          userLanguage={this.props.user.language}
          blocked={
            blocked.findIndex(friend => friend.id === this.props.selected) !==
            -1
          }
        />
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
    loading: state.message.loading,
    isTyping: state.message.isTyping,
    title: state.message.isTyping
      ? 'The other user is typing...'
      : 'Start your conversation',
    translateall: state.message.translateAll,
    blocked: state.userFriends.blocked
  }
}

const mapDispatch = dispatch => {
  return {
    getFriends: userId => dispatch(fetchUserFriends(userId)),
    getAllMessages: (id, otherId) => dispatch(getAllMessages(id, otherId)),
    postAMessage: (text, senderId, receiverId, bool) =>
      dispatch(postAMessage(text, senderId, receiverId, bool)),
    translateOne: (text, lan, messageId) =>
      dispatch(translateOne(text, lan, messageId)),
    translateAll: (messages, language) =>
      dispatch(translateAll(messages, language))
  }
}
export default connect(mapState, mapDispatch)(Messages)
