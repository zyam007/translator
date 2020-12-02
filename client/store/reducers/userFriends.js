import axios from 'axios'

const GET_USER_FRIENDS = 'GET_USER_FRIENDS'
const CONFIRM_FRIEND = 'CONFIRM_FRIEND'

const putUserFriend = () => {
  return {
    type: CONFIRM_FRIEND
  }
}

const setUserFriends = userFriends => {
  return {
    type: GET_USER_FRIENDS,
    userFriends
  }
}

export const confirmFriend = (id, friendId, action) => {
  console.log('confirming')
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/friends/${id}`, {friendId, action})
      //console.log('data of friendship', data)
      // dispatch(putUserFriend(data))
      dispatch(fetchUserFriends(id))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchUserFriends = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/friends/${id}`)
      dispatch(setUserFriends(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}
const userFriendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FRIENDS: {
      return action.userFriends
    }
    case CONFIRM_FRIEND: {
      return {...state}
    }
    default: {
      return state
    }
  }
}

export default userFriendsReducer
