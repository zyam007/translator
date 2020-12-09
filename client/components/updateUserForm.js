import React from 'react'
import {Form, Col, Button, Row} from 'react-bootstrap'
//import '../../public/App.scss'

export default function updateUserForm(props) {
  console.log('PROPS UPDATE USER FORM', props)
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
      <label>Upload a new picture</label>
      <input type="file" name="upload" defaultValue={undefined} />
      <Form.Group controlId="exampleForm.ControlSelect">
        <Form.Label>Change Language</Form.Label>
        <Form.Control as="select" name="language">
          <option>ENG</option>
          <option>SPA</option>
          <option>CHI</option>
          <option>RUS</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit" className="btn-saveUpdates">
        Save Changes
      </Button>
    </Form>
  )
}
