import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ResponseConstructorContract } from '@ioc:Adonis/Core/Response'
import SocketService from 'App/Services/SocketService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {}

  public async boot() {
    this.app.container.withBindings(
      ['Adonis/Core/Response'],
      (context: ResponseConstructorContract) => {
        context.macro('globalSuccess', function (message: string, code: number = 200) {
          return this.status(code).send({
            success: true,
            message: message,
          })
        })

        context.macro('globalError', function (message: string, code: number = 400) {
          return this.status(code).send({
            success: false,
            message: message,
          })
        })

        context.macro('unauthorized', function (message: string, code: number = 401) {
          return this.status(code).send({
            success: false,
            message: message,
          })
        })
      }
    )
    // @ts-ignore
    this.app.container.use('App/Services/SocketService', new SocketService())
  }

  public async ready() {}

  public async shutdown() {}
}
