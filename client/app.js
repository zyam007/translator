import React from 'react'

import {NavBar} from './components'
import Routes from './routes'
//import '../public/App.scss'
import 'bootstrap/dist/css/bootstrap.css'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  )
}

export default App
