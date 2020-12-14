import React from 'react'
import Loader from 'react-loader-spinner'
function LoadingView(props) {
  return (
    <div>
      <p>Loading messages...Please wait</p>
      <Loader type="Rings" color="#00BFFF" height={80} width={80} />
    </div>
  )
}

export default LoadingView
