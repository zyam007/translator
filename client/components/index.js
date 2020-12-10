/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as NavBar} from './navbar'
export {Login, Signup} from './auth-form'
export {default as FriendList} from './friendList'
export {default as MyProfile} from './myprofile'
export {default as Main} from './mainComponent/main'
export {default as AddFriend} from './addFriend'
export {default as UpdateForm} from './updateUserForm'
export {default as Welcome} from './welcome'
export {default as AboutUs} from './aboutUs'
export {default as SearchFriend} from './searchFriend'
