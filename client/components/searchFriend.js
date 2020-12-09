import React from 'react'
import {Button, Alert} from 'react-bootstrap'

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
      <div>
        <div>
          <h6>We found your friend: {userName}</h6>
          <img src={profilePicture} className="profile-photo" />
          <div>Language: {language}</div>
          <label htmlFor="text">Add a note to introduce yourself</label>
          <input
            type="text"
            name="intro"
            value={props.intro}
            onChange={props.handleChange}
            style={{height: '100px', width: '200px'}}
          />
          <Button type="submit" onClick={props.handleAdd}>
            Send Friend Request
          </Button>
        </div>
      </div>
    )
  }
}

export default SearchFriend
