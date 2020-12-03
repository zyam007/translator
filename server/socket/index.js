module.exports = io => {
  io.on('connection', socket => {
    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message)
    })
    socket.on('new-friend', data => {
      socket.broadcast.emit('new-friend', data)
    })
    socket.on('user typing', data => {
      socket.broadcast.emit('user typing', data)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
