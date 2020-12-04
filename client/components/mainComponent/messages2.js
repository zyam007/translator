// right before Input
/* <ul
className="list overflow-wrapper"
style={{minHeight: '100%', height: '100%'}}
>
{ this.state.showTrans ? (
  { this.props.translateAll.map(message => {
    return (
    <div key={message.id>
      <li className={
          'messages' +
          (message.receiverId === this.props.userId
            ? 'receiver'
            : 'sender')
            }>
            {this.state.translate[message.id]}
          </li>
          </div>)
) : (
  {this.props.messages.map(message => {
    return (
      <div key={message.id}>
          <li
            className={
              'messages' +
              (message.receiverId === this.props.userId
                ? 'receiver'
                : 'sender')
            }
          >
            {message.text}
          </li>
        )}
)}

      <button
        type="submit"
        onClick={() => {
          this.translate(
            message.text,
            this.props.user.language,
            message.id
          )
        }}
      >
        translate message
      </button>
    </div>
  )
})}
</ul>
<div style={{  bottom: '0px' }}>
<button type="submit" onClick={() => {
      this.toggleShowTrans()
    }}>translate all</button> */

//   <button
//   type="submit"
//   onClick={() => {
//     this.props.translateAll(
//       this.props.messages,
//       this.props.user.language
//     )
//   }}
// >
//   translate all
// </button>{' '}
