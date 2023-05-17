import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WelcomesController {
  public async create({ response }: HttpContextContract) {
    return response.globalSuccess('Welcome to the bot')
  }
}
