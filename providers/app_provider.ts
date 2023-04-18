import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import SocketService from 'app/services/socket_service'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {}

  public async boot() {
    // @ts-ignore
    this.app.container.use('app/services/socket_service', new SocketService())
    console.log(this.app.container)
  }

  public async ready() {}

  public async shutdown() {}
}
