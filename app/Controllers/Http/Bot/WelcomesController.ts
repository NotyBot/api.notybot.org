import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Welcome from 'App/Models/Welcome'

export default class WelcomesController {
  public async show({ params, response }: HttpContextContract) {
    return response.send(await Welcome.findBy('guild_id', params.guildId))
  }
}
