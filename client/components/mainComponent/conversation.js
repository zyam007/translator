import React, {Component, useState, useEffect} from 'react'
import {Container, ListGroup, Button} from 'react-bootstrap'
import './convo.css'
import {MDBRow, MDBCol, MDBIcon} from 'mdbreact'
// import Speech from './speech'
import io from 'socket.io-client'
import store from '../../store'
const socket = io(window.location.origin)
// import 'font-awesome/css/font-awesome.min.css'
export default function Conversation(props) {
  const [search, setSearch] = useState('')
  const [newMessage, setNewMessage] = useState({})
  // useEffect(() => {
  //   if (newMessage[props.selected]) {
  //     setNewMessage(newMessage[props.selected] = false)
  //   }

  // })
  const updateSearch = event => {
    setSearch(event.target.value.substr(0, 20))
  }
  socket.on('new-message', message => {
    console.log('in conversation.js, this is the message', message)
    let state = store.getState()
    if (state.user.id === message.receiverId) {
      //message userId is the person that sent the message
      if (!newMessage[message.userId]) {
        setNewMessage((newMessage[message.userId] = true))
        console.log('type of userId in message', typeof message.userId)
      }
      console.log('newMessage', newMessage)
    }
  })
  const userSelected = event => {
    setSearch('')
    props.handleClick(event)
  }

  if (props.otherInChat === []) {
    return (
      <div>
        <p>loading</p>
      </div>
    )
  }
  return (
    <div style={{minWidth: '20%'}} className="d-flex flex-column bg-dark">
      <Container
        className="border-right overflow-auto flex-grow-1"
        style={{
          marginLeft: '0',
          marginRight: '0',
          paddingLeft: '0',
          paddingRight: '0'
        }}
      >
        <div className="headind_srch">
          <div className="stylish-input-group">
            <input
              type="text"
              value={search}
              placeholder="Search"
              className="search_friends"
              onChange={updateSearch}
            />

            <div className="recent_heading">
              <h4>Recent</h4>
            </div>
          </div>
        </div>
        <ul>
          {props.otherInChat
            .filter(user => {
              return (
                user.userName.toLowerCase().indexOf(search.toLowerCase()) !== -1
              )
            })
            .map(user => {
              return (
                <li
                  key={user.id}
                  className={
                    props.selected === user.id ? 'highlight' : 'convo bg-dark'
                  }
                  value={user.id}
                  onClick={userSelected}
                  style={{cursor: 'pointer'}}
                >
                  <img src={user.profilePicture} className="img" />
                  {user.userName}
                  <img
                    src={`/img/flags/${user.language}.png`}
                    style={{
                      width: '20px',
                      marginLeft: '10px'
                    }}
                  />
                  {newMessage[user.id] ? (
                    // <MDBIcon icon="ellipsis-h" style={{ 'paddingLeft': '10px' }} />
                    <p>{user.id}true</p>
                  ) : (
                    <p>{user.id}false</p>
                  )}
                </li>
              )
            })}
        </ul>
      </Container>
      {/* <Speech userLanguage={props.userLanguage} /> */}
    </div>
  )
}
