import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiCredential from 'App/Models/ApiCredential'

export default class AuthBotMiddleware {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const token = request.header('Authorization')!.split(' ')[1]
    const botCredential = await ApiCredential.findBy('bearer_token', token)

    if (!botCredential) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    if (botCredential.bearer_token !== token) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    await next()
  }
}
