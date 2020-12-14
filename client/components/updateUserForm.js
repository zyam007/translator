import React, {useState} from 'react'
import {Form, Col, Button, Row} from 'react-bootstrap'

export default function updateUserForm(props) {
  const [userLang, setUserLang] = useState(props.language)
  const changeLang = event => {
    setUserLang(event.target.value)
  }
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group as={Row} controlId="formPlaintextUserName">
        <Form.Label column sm="3">
          Username
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            type="text"
            placeholder="UserName"
            name="userName"
            defaultValue={props.userName}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextImageUrl">
        <Form.Label column sm="3">
          Image Url
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            type="text"
            placeholder="Image Url"
            name="profilePicture"
            defaultValue={props.profilePicture}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.File
          id="exampleFormControlFile1"
          type="file"
          name="upload"
          label="Upload a new picture"
          column
          sm="3"
        />
      </Form.Group>
      <Form.Group as={Row} controlId="exampleForm.ControlSelect">
        <Form.Label column sm="3">
          Change Language
        </Form.Label>
        <Col sm="5">
          <Form.Control
            as="select"
            name="language"
            type="language"
            value={userLang}
            onChange={changeLang}
          >
            <option value="ENG">English </option>
            <option value="ARA">Arabic</option>
            <option value="CHI">Chinese</option>
            <option value="FIL">Filipino</option>
            <option value="FRE">French</option>
            <option value="HIN">Hindi</option>
            <option value="ja">Japanese</option>
            <option value="KOR">Korean</option>
            <option value="RUS">Russian</option>
            <option value="SPA">Spanish</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Button type="submit" className="btn-saveUpdates">
        Save Changes
      </Button>
    </Form>
  )
}
