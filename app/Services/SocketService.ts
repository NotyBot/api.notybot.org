import net, { Socket } from 'node:net'

export default class SocketService {
  public server: net.Server

  constructor() {
    this.server = net.createServer((socket: Socket) => {
      socket.on('data', (data) => {
        console.log(`Received data: ${data}`)
        socket.write('Server received data')
      })
      socket.on('end', () => {
        console.log('Client disconnected')
      })
    })
    this.server.listen(3000, () => {
      console.log('Server started')
    })
  }
}
