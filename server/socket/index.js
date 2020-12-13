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
    socket.on('active', data => {
      socket.broadcast.emit('active', data.id)
      console.log('server side active', data.id)
    })
    socket.on('inActive', data => {
      socket.broadcast.emit('inActive', data.id)
      console.log('server side inactive', data.id)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
