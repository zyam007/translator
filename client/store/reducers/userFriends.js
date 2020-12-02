import axios from 'axios'

const GET_USER_FRIENDS = 'GET_USER_FRIENDS'

const setUserFriends = userFriends => {
  return {
    type: GET_USER_FRIENDS,
    userFriends
  }
}

export const fetchUserFriends = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/users/friends', {userId})
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
    default: {
      return state
    }
  }
}

export default userFriendsReducer
