import React from 'react'
import {GoMarkGithub} from 'react-icons/go'
// import { AiTwotoneTrophy } from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'
import {MDBCol, MDBContainer, MDBRow, MDBFooter} from 'mdbreact'
import './footer.css'
const Footer = () => {
  return (
    <MDBFooter
      style={{
        bottom: '0px',
        width: '100 %'
      }}
      className="font-small pt-4 mt-4 "
      id="footer"
    >
      <MDBContainer
        fluid
        className="text-center text-md-left"
        style={{alignItems: 'right'}}
      >
        <MDBRow>
          <MDBCol md="6" style={{paddingLeft: '50px'}}>
            <h5 className="title">Chatty Polyglot</h5>
            <p>Chit Chat Chit Chat</p>
            <a
              href="https://github.com/Translator-webapp/translator"
              rel="noopener noreferrer"
              target="_blank"
              className="linkedIn"
            >
              <GoMarkGithub size={32} /> Link to GitHub
            </a>
          </MDBCol>
          <MDBCol md="5" style={{textAlign: 'left', paddingLeft: '200px'}}>
            <MDBCol md="10">
              <ul>
                <li className="list-unstyled">
                  <h5 className="title">Proud Creators</h5>
                </li>
                <li className="list-unstyled">
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
                </li>
                <li className="list-unstyled">
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
                </li>
                <li className="list-unstyled">
                  <AiFillLinkedin size={25} />{' '}
                  <a
                    href="https://www.linkedin.com/in/yanna-skorokhodova/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="linkedIn"
                  >
                    Yanna Skorokhodova
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div>
        <MDBContainer style={{height: '25px'}} fluid />
      </div>
    </MDBFooter>
  )
}

export default Footer
