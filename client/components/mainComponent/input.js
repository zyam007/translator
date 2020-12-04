import React, {useState, useEffect} from 'react'
import Picker from 'react-giphy-component'
require('../../../secrets')
import {Button, InputGroup, FormControl, Form} from 'react-bootstrap'
const GAPI = process.env.GAPI || 'missing API for giphy'

function Input(props) {
  return (
    <div>
      {/* <form onSubmit={props.handleSubmit}>
      <label>
        <input
          type="text"
          value={props.value}
          name="new-message"
          onChange={props.handleChange}
          placeholder="Type here"
          style={{width: '100%', bottom: '0px'}}
        />
      </label> */}

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Type here"
          aria-label="sending text"
          aria-describedby="basic-addon2"
          type="text"
          value={props.value}
          name="new-message"
          onChange={props.handleChange}
        />

        <InputGroup.Append>
          <Button
            variant="secondary"
            type="submit"
            onClick={props.handleSubmit}
          >
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {/* <Button type="submit">Send</Button> */}

      {/* </form> */}

      <Button onClick={props.toggle} style={{width: '100px', height: '40px'}}>
        MEMES
      </Button>
      {props.toggleMemes ? (
        <Picker onSelected={props.handleGIPHY} apiKey={GAPI} />
      ) : (
        <div />
      )}
    </div>
  )
}

export default Input
