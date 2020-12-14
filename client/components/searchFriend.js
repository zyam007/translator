import React from 'react'
import {Button, Alert, Row, FormControl} from 'react-bootstrap'

const SearchFriend = props => {
  const {userName, profilePicture, language, id} = props.user || ''
  const func = each => {
    return each.id === id
  }
  const array = props.userWithFriends.friends || ''
  const check = array.some(func)
  if (props.error) {
    return (
      <Alert variat="warning">
        Sorry, we couldn't find your friend! Try searching another email.
      </Alert>
    )
  } else if (check) {
    return (
      <Alert variat="warning">
        This friend or friend request already exists.
      </Alert>
    )
  } else if (id === props.userId) {
    return <Alert variat="warning">This is your email.</Alert>
  } else {
    return (
      <div className="justify-content-center">
        <Row className="col d-flex justify-content-center">
          <h5>We found your friend: {userName}</h5>
        </Row>
        <Row className="col d-flex justify-content-center">
          <img src={profilePicture} className="profile-photo" />
        </Row>
        <Row className="col d-flex justify-content-center">
          <p>They speak {language}</p>
        </Row>
        <Row className="col d-flex justify-content-center">
          <FormControl
            placeholder="Add a note to introduce yourself ..."
            as="textarea"
            type="text"
            name="intro"
            value={props.intro}
            onChange={props.handleChange}
            style={{height: '100px', width: '200px'}}
          />
        </Row>
        <Row className="col d-flex justify-content-center">
          <Button type="submit" onClick={props.handleAdd}>
            Send Friend Request
          </Button>
        </Row>
      </div>
    )
  }
}

export default SearchFriend
