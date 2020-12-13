import React from 'react'
import './aboutUs.css'
import {Row, Col} from 'react-bootstrap'
import Footer from './footer'

function AboutUs(props) {
  return (
    <div id="landing-page-app">
      <div className="landing-base mt-5" style={{height: '80vh', opacity: 5}}>
        <Row
          className="mr-5 ml-5"
          id="about-us-row"
          style={{marginLeft: '0', marginRight: '0'}}
        >
          <Col>
            <div className="intro-title mb-5">
              <img
                src="/img/maps.jpg"
                alt="people chatting"
                className="chattingImg center"
              />
            </div>
            <div className="text-box1">
              <div className="content text-center">
                <h3>A New Way to Communicate</h3>
                <p>
                  Chatty Polyglot is the easiest way to communicate with your
                  friends that speak different languages!
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div className="text-box2">
              <div className="content text-center">
                <h3>Messages, Memes, Audios - All in one app!</h3>
                <p>
                  "Chatty Polyglot has made it so easy for me to talk to people
                  from different countries!" -Anonymous User
                </p>
              </div>
            </div>
            <div className="mt-5">
              <img
                src="/img/friends.jpg"
                alt="people chatting"
                className="chattingImg center"
                style={{float: 'right'}}
              />
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
