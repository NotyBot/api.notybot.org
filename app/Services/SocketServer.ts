import * as net from 'net'

export class SocketServer {
  private server: net.Server
  private sockets: net.Socket[] = []

  public async init() {
    this.server = net.createServer(this.handleConnection)

    this.server.listen(3000, () => {
      console.log(`Serveur socket en écoute sur le port 3000`)
    })
  }
  private handleConnection = (socket: net.Socket) => {
    console.log('Nouvelle connexion établie !')

    this.sockets.push(socket)

    socket.on('data', (data) => {
      console.log('Données reçues : ' + data)
    })

    socket.on('end', () => {
      console.log('Connexion fermée !')
      const index = this.sockets.indexOf(socket)
      if (index !== -1) {
        this.sockets.splice(index, 1)
      }
    })
  }
  public sendData(data: string) {
    this.sockets.forEach((socket) => {
      socket.write(data)
    })
  }

  public emitEvent(event: string, eventData: any) {
    const eventObject = {
      event: event,
      data: eventData,
    }
    const eventJson = JSON.stringify(eventObject)
    this.sendData(eventJson)
  }
}
