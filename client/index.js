import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import {persistor} from './store'
import App from './app'
import {Notifications} from 'react-push-notification'
// establishes socket connection
// import './socket'
import {PersistGate} from 'redux-persist/lib/integration/react'
import {LoadingView} from '../client/components/index'
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Notifications />
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById('app')
)
