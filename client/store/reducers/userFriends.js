import axios from 'axios'

const GET_USER_FRIENDS = 'GET_USER_FRIENDS'

const setUserFriends = userFriends => {
  return {
    type: GET_USER_FRIENDS,
    userFriends
  }
}

export const deleteFriend = (id, friendId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/friends/${id}`, {
        data: {friendId}
      })
      dispatch(fetchUserFriends(id))
    } catch (err) {
      console.log(err)
    }
  }
}

export const confirmFriend = (id, friendId, action) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/friends/${id}`, {friendId, action})
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
    default: {
      return state
    }
  }
}

export default userFriendsReducer
