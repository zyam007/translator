import React from 'react'

function Input(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        <input
          type="text"
          value={props.value}
          onChange={props.handleChange}
          placeholder="Type here..."
          style={{width: '100%'}}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Input
