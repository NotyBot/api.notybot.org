import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
import Logger from '@ioc:Adonis/Core/Logger'

class WebSocket {
  public io: Server
  private booted = false

  public boot() {
    if (this.booted) {
      return
    }

    this.booted = true
    this.io = new Server(AdonisServer.instance)
    Logger.info('WebSocket booted !')
  }
}

export default new WebSocket()
