import React from 'react'
import {GoMarkGithub} from 'react-icons/go'
import {AiFillLinkedin} from 'react-icons/ai'
import {Container, Row, Col} from 'react-bootstrap'
import './footer.css'
const Footer = () => {
  return (
    <Container
      className="d-flex justify-content-around"
      fluid
      id="footer"
      style={{
        bottom: '0px'
      }}
    >
      <Col md="auto" className="mt-3 mb-3" id="left-footer">
        <Row>
          <h5 className="title">Chatty Polyglot</h5>
        </Row>
        <Row>
          <p>Chit Chat Chit Chat</p>
        </Row>
        <Row>
          <a
            href="https://github.com/Translator-webapp/translator"
            rel="noopener noreferrer"
            target="_blank"
            className="linkedIn"
          >
            <GoMarkGithub size={32} /> Link to GitHub
          </a>
        </Row>
      </Col>
      <Col md="auto" className="mt-3 mb-3" id="right-footer">
        <Row>
          <h5 className="title">Proud Creators</h5>
        </Row>
        <Row>
          <AiFillLinkedin size={25} />{' '}
          <a
            href="https://www.linkedin.com/in/tqj5047/"
            rel="noopener noreferrer"
            target="_blank"
            className="linkedIn"
          >
            {' '}
            Tianying (Jenna) Jiang
          </a>
        </Row>
        <Row>
          <AiFillLinkedin size={25} />{' '}
          <a
            href="https://www.linkedin.com/in/josephineamos/"
            rel="noopener noreferrer"
            target="_blank"
            className="linkedIn"
          >
            {' '}
            Josephine Amos
          </a>
        </Row>
        <Row>
          <AiFillLinkedin size={25} />{' '}
          <a
            href="https://www.linkedin.com/in/yanna-skorokhodova/"
            rel="noopener noreferrer"
            target="_blank"
            className="linkedIn"
          >
            Yanna Skorokhodova
          </a>
        </Row>
      </Col>
    </Container>
  )
}

export default Footer
