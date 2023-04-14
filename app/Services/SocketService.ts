import { Socket, Server } from 'node:net'
import Logger from '@ioc:Adonis/Core/Logger'

interface ClientHeartbeat {
  client: Socket
  intervalId: NodeJS.Timeout
}

export default class SocketService {
  public server: Server
  private clients: Map<string, ClientHeartbeat> = new Map()

  constructor() {
    this.server = new Server()
    this.server.on('connection', this.handleConnection.bind(this))
    this.server.listen(3000, () => {
      Logger.info('Server listening on port 3000')
    })
  }

  private handleConnection(client: Socket) {
    console.log('new client connected')

    this.clients.set(client.remoteAddress!, {
      client,
      intervalId: setInterval(() => {
        const event = {
          code: 0,
          data: { foo: 'bar' },
        }
        client.write(JSON.stringify(event))
      }, Math.floor(Math.random() * 10000) + 1000),
    })

    client.on('data', (data) => {
      console.log('data', data.toString())
      // if (data.toString() === 'PING') {
      //   console.log('Received PING from client')
      // } else {
      //   console.log('Received data from client: ', data.toString())
      // }
    })

    client.on('end', () => {
      console.log('client disconnected')
      const clientHeartbeat = this.clients.get(client.remoteAddress!)
      if (clientHeartbeat) {
        clearInterval(clientHeartbeat.intervalId)
        this.clients.delete(client.remoteAddress!)
      }
    })

    client.on('error', (err) => {
      console.log('client error', err)
      client.end()
    })
  }
}
