import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true
// mic.lang = ''

export default function Speech(props) {
  // to make this more scalable, maybe we can create some JavaScript Object that associates the user language with the mic language
  if (props.userLanguage === 'RUS') mic.lang = 'ru'
  if (props.userLanguage === 'CHI') mic.lang = 'zh-cn'
  if (props.userLanguage === 'SPA') mic.lang = 'es'
  if (props.userLanguage === 'ENG') mic.lang = 'en'

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  //const [saveNotes, setSaveNotes] = useState([])
  console.log('lang', props.userLanguage)
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
      // console.log(transcript)

      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNotes = () => {
    //setSaveNotes([...saveNotes, note])
    props.handleVoice(note)
    setNote('')
  }

  return (
    <div>
      {isListening ? <span>listening...</span> : <span>Not listening...</span>}
      <Button
        variant="warning"
        onClick={() => setIsListening(prevState => !prevState)}
      >
        Start/Stop
      </Button>
      <Button variant="danger" onClick={handleSaveNotes} disabled={!note}>
        Send
      </Button>
    </div>
  )
}
