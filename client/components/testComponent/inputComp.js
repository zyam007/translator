import React, {useState, useEffect} from 'react'
import Picker from 'react-giphy-component'
require('../../../secrets')
import {Button, InputGroup, FormControl, Form} from 'react-bootstrap'
const GAPI = process.env.GAPI || 'missing API for giphy'

export default function InputComp(props) {
  return (
    <div>
      <div className="d-flex flex-column align-items-end">
        <Button
          style={{width: '100px'}}
          variant="outline-primary"
          type="submit"
          onClick={() => {
            props.toggleShowTrans()
          }}
        >
          Translate
        </Button>
        <Button
          style={{width: '100px'}}
          variant="outline-warning"
          onClick={props.toggle}
        >
          Gifs
        </Button>
        {props.toggleMemes ? (
          <Picker onSelected={props.handleGIPHY} apiKey={GAPI} />
        ) : (
          <div />
        )}
      </div>
      <InputGroup className="m-2">
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
    </div>
  )
}
