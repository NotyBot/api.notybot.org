import { Socket, Server } from 'node:net'
import Logger from '@ioc:Adonis/Core/Logger'
import Env from '@ioc:Adonis/Core/Env'
import { sendHello } from '../../utils/socket_utils'

interface ClientHeartbeat {
  client: Socket
}
export default class SocketService {
  public server: Server
  private clients: Map<string, ClientHeartbeat> = new Map()

  private HEARTBEAT_TIMEOUT = 5000

  constructor() {
    this.server = new Server()
    this.server.on('connection', this.handleConnection.bind(this))
    this.server.listen(Env.get('SOCKET_PORT'), () => {
      Logger.info(`Server listening on port ${Env.get('SOCKET_PORT')}`)
    })
  }

  private handleConnection(client: Socket) {
    Logger.info(`Client connected: ${client.remoteAddress}`)

    let heartbeatTimer: NodeJS.Timeout
    this.clients.set(client.remoteAddress!, {
      client,
    })

    client.on('data', async (data) => {
      try {
        const payload = JSON.parse(data.toString().trim())
        switch (payload.code) {
          case 0:
            await sendHello(payload, client)
            break
          case 1:
            clearTimeout(heartbeatTimer)
            heartbeatTimer = setTimeout(() => {
              client.end()
            }, this.HEARTBEAT_TIMEOUT)
            break
        }
      } catch (error) {
        console.log('Des fois la dn est down')
        console.log(`Error parsing JSON: ${error}`)
      }
    })

    client.on('close', () => {
      this.clients.delete(client.remoteAddress!)
    })

    client.on('error', (error: Error) => {
      Logger.error(error.message)
      this.clients.delete(client.remoteAddress!)
    })

    client.on('end', () => {
      clearTimeout(heartbeatTimer)
      this.clients.delete(client.remoteAddress!)
    })

    heartbeatTimer = setTimeout(() => {
      client.end()
    }, this.HEARTBEAT_TIMEOUT)
  }
}
