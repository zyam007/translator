import React from 'react'
import Input from './input'
import './message.css'
const message1 = {
  id: 1,
  text: 'I dont think so',
  userId: 1,
  receiverId: 2,
  conversationId: 1
}
const message2 = {
  id: 2,
  text: 'wait',
  userId: 2,
  receiverId: 1,
  conversationId: 1
}
const message3 = {
  id: 3,
  text: 'ok I agree',
  userId: 1,
  receiverId: 2,
  conversationId: 1
}
const message4 = {
  id: 4,
  text: 'YOLO',
  userId: 2,
  receiverId: 1,
  conversationId: 1
}
const user = {
  id: 1,
  userName: 'Jamie'
}
class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    alert('A message was submitted: ' + this.state.value)
    event.preventDefault()
  }
  render() {
    const messages = [message1, message2, message3, message4]
    console.log(
      'is it true',
      messages[0].receiverId == user.id,
      messages[1].receiverId == user.id
    )
    return (
      <ul className="list">
        {// ={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}
        messages.map(message => {
          return (
            <li
              key={message.id}
              className={
                'messages' +
                (message.receiverId == user.id ? 'receiver' : 'sender')
              }
            >
              {message.text}
            </li>
          )
        })}
        <li>
          <Input
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            value={this.state.value}
          />
        </li>
      </ul>
    )
  }
}

export default Messages
