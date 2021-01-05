/* eslint-disable */

import React, {useState, useEffect} from 'react'
import Picker from 'react-giphy-component'
require('../../../secrets')
import {Button, InputGroup, FormControl, Form} from 'react-bootstrap'
const GAPI = process.env.GAPI || 'missing API for giphy'

import {faMicrophone} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {TwitterPicker} from 'react-color'
import './input.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true

export default function Input(props) {
  if (props.userLanguage === 'RUS') mic.lang = 'ru'
  if (props.userLanguage === 'CHI') mic.lang = 'zh-cn'
  if (props.userLanguage === 'SPA') mic.lang = 'es'
  if (props.userLanguage === 'ENG') mic.lang = 'en'
  if (props.userLanguage === 'FIL') mic.lang = 'tl'
  if (props.userLanguage === 'FRE') mic.lang = 'fr'
  if (props.userLanguage === 'HIN') mic.lang = 'hi'
  if (props.userLanguage === 'ARA') mic.lang = 'ar'
  if (props.userLanguage === 'KOR') mic.lang = 'ko'
  if (props.userLanguage === 'ja') mic.lang = 'ja'

  const [isListening, setIsListening] = useState(false)

  const [note, setNote] = useState(null)

  useEffect(
    () => {
      handleListen()
    },
    [isListening]
  )

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped the mic on Click and the note is')
        setNote('')
      }
    }
    mic.onstart = () => {
      console.log('Mic is on')
    }
    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      props.handleVoiceOnChange(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  return (
    <div>
      <div
        className="d-flex flex-row"
        style={{backgroundColor: `${props.background}`}}
      >
        <hr />
        <div className="d-flex flex-column align-self-end mr-auto">
          <Button
            style={{width: '100px'}}
            variant="secondary"
            onClick={props.toggle2}
            disabled={props.blocked}
            className="mx-2"
          >
            <img src="color-palette.png" style={{width: '22px'}} />
          </Button>
          {props.toggleColor ? (
            <TwitterPicker
              color={props.background}
              onChangeComplete={props.handleChangeColor}
            />
          ) : (
            <div />
          )}
        </div>
        <div className="d-flex flex-column align-self-end ml-auto">
          <Button
            style={{width: '100px'}}
            variant="secondary"
            onClick={props.toggle}
            disabled={props.blocked}
            className="mx-2"
          >
            <img src="gif.png" style={{width: '22px'}} />
          </Button>
          {props.toggleMemes ? (
            <Picker onSelected={props.handleGIPHY} apiKey={GAPI} />
          ) : (
            <div />
          )}
        </div>
      </div>
      <InputGroup className="m-2 pr-3">
        <InputGroup.Prepend>
          <Button
            variant="outline-secondary"
            type="submit"
            onClick={() => {
              props.toggleShowTrans()
            }}
          >
            <img src="translating.png" className="translate-icon" />
          </Button>
          <Button
            variant={isListening ? 'danger' : 'outline-secondary'}
            onClick={() => setIsListening(prevState => !prevState)}
            disabled={props.blocked}
          >
            <FontAwesomeIcon className="microphone" icon={faMicrophone} />
          </Button>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Type here"
          aria-label="sending text"
          // aria-describedby="basic-addon2"
          as="textarea"
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
            disabled={props.blocked}
          >
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}
