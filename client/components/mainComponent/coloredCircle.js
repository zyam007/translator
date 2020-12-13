import './coloredCircle.css'
import React from 'react'
const ColoredCircle = ({color}) => {
  if (color == 'red') {
    return (
      <>
        <span className="colored-circle-red dot" />
      </>
    )
  } else {
    return (
      <>
        <span className="colored-circle-green dot" />
      </>
    )
  }
}

export default ColoredCircle
