import { Server } from 'net'

export default class SocketService {
  private server: Server

  constructor() {
    this.server = new Server()
    this.server.on('connection', this.handleConnection.bind(this))
    this.server.listen(3000, () => {
      console.log('Socket server started on port 3000')
    })
  }

  public emitEvent(eventName: string, data: any) {
    if (Array.isArray(this.server.connections)) {
      this.server.connections.forEach((socket) => {
        socket.write(JSON.stringify({ eventName, data }))
      })
    }
  }

  private handleConnection(socket: any) {
    console.log(`Socket ${socket.remoteAddress}:${socket.remotePort} connected`)
    socket.on('data', this.handleData.bind(this, socket))
    socket.on('close', this.handleClose.bind(this, socket))
    socket.on('error', this.handleError.bind(this, socket))
  }

  private handleData(socket: any, data: any) {
    console.log(`Data received from ${socket.remoteAddress}:${socket.remotePort}: ${data}`)
  }

  private handleClose(socket: any) {
    console.log(`Socket ${socket.remoteAddress}:${socket.remotePort} closed`)
  }

  private handleError(socket: any, err: any) {
    console.error(`Socket ${socket.remoteAddress}:${socket.remotePort} error: ${err}`)
  }
}
