import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import SocketService from 'App/Services/SocketService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {}

  public async boot() {
    // @ts-ignore
    this.app.container.use('App/Services/SocketService', new SocketService())
  }

  public async ready() {}

  public async shutdown() {}
}
