import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Welcome from 'App/Models/Welcome'
import WelcomeValidator from 'App/Validators/WelcomeValidator'

export default class WelcomesController {
  public async show({ params, response }: HttpContextContract) {
    return response.send(await Welcome.findBy('guild_id', params.guildId))
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(WelcomeValidator)

    const welcome = await Welcome.findBy('guild_id', params.guild_id)
    welcome!.merge(data)

    return response.send('Welcome message updated !')
  }
}
