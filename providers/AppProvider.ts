import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import SocketService from 'App/Services/SocketService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {}

  public async boot() {}

  public async ready() {
    new SocketService()
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
