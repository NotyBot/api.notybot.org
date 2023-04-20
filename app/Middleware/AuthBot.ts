import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiCredential from 'App/Models/ApiCredential'

export default class AuthBotMiddleware {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const botCredential = await ApiCredential.findBy('bearerToken', request.header('Authorization'))

    if (!botCredential) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    if (botCredential.bearer_token !== request.header('Authorization')) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    await next()
  }
}
