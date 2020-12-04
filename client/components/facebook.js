// import React, { Component } from 'react'
// import FacebookLogin from 'react-facebook-login'
// import { connect } from 'react-redux'

// class facebook extends Component {
//   state = {
//     isLoggedIn: false,
//     userID: '',
//     name: '',
//     email: '',
//     picture: '',
//     accessToken: ''

//   }
//   responseFacebook = response => {
//     console.log(response)
//     this.setState({
//       isLoggedIn: true,
//       userID: response.userID,
//       name: response.name,
//       email: response.email,
//       picture: response.picture.data.url,
//       accessToken: response.accessToken
//     })
//   }
//   componentClicked = () => console.log('clicked')
//   render() {
//     let fbContent;
//     if (this.state.isLoggedIn) {
//       fbContent = (
//         <div></div>
//       )
//     } else {
//       fbContent = (
//         <FacebookLogin
//           appId="810174349780633"
//           autoLoad={true}
//           fields="name,email,picture"
//           onClick={this.componentClicked}
//           callback={this.responseFacebook} />
//       )
//     }
//     return (
//       <div>
//         {fbContent}
//       </div>
//     )

//   }
// }
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error
//   }
// }

// const mapDispatchL = dispatch => {
//   return {

//   }
// }

// export default connect(mapstate, mapdispatch)(facebook)
