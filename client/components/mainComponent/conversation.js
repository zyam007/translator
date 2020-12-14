import React, {Component, useState, useEffect} from 'react'
import {Container, ListGroup, Button} from 'react-bootstrap'
import './convo.css'
import {MDBRow, MDBCol, MDBIcon} from 'mdbreact'
import ColoredCircle from './coloredCircle'
// import Speech from './speech'

export default function Conversation(props) {
  const [search, setSearch] = useState('')

  const updateSearch = event => {
    setSearch(event.target.value.substr(0, 20))
  }

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

  const newUnread = props.newUnread || []

  return (
    <div
      style={{minWidth: '25%', maxWidth: '25%'}}
      className="d-flex flex-column bg-dark"
    >
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
                  <img
                    src={user.profilePicture}
                    className="img"
                    style={{
                      border: props.active.includes(user.id)
                        ? '3px solid green'
                        : ''
                    }}
                  />
                  {user.userName}
                  <img
                    src={`/img/flags/${user.language}.png`}
                    style={{
                      width: '20px',
                      marginLeft: '10px'
                    }}
                  />

                  {newUnread.includes(user.id) ? (
                    <MDBIcon icon="ellipsis-h" style={{paddingLeft: '10px'}} />
                  ) : (
                    <></>
                  )}
                  {/* <ColoredCircle
                    color={props.active.includes(user.id) ? 'green' : 'red'}
                  /> */}
                  <span
                    className={
                      'user' + (props.active.includes(user.id) ? 'on' : 'off')
                    }
                  />
                </li>
              )
            })}
        </ul>
      </Container>
    </div>
  )
}
