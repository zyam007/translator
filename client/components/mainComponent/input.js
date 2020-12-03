import React, {useState, useEffect} from 'react'
import Picker from 'react-giphy-component'
require('../../../secrets')
const GAPI = process.env.GAPI || 'missing API for giphy'

function Input(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>
          <input
            type="text"
            value={props.value}
            name="new-message"
            onChange={props.handleChange}
            placeholder="Type here"
            style={{width: '100%', bottom: '0px'}}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
      <button onClick={props.toggle} style={{width: '100px', height: '40px'}}>
        MEMES
      </button>
      {props.toggleMemes ? (
        <Picker onSelected={props.handleGIPHY} apiKey={GAPI} />
      ) : (
        <div />
      )}
    </div>
  )
}

export default Input
