import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GuildValidator from 'App/Validators/GuildValidator'
import Guild from 'App/Models/Guild'
import Welcome from 'App/Models/Welcome'
import { DefaultWelcomeValue } from '../../../../constants/Guild'

export default class GuildsController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(GuildValidator)

    const guild = await Guild.updateOrCreate(
      {
        id: data.id,
      },
      {
        id: data.id,
        name: data.name,
        channels: data.channels,
      }
    )

    const welcome = await Welcome.findBy('guild_id', guild.id)
    if (!welcome) {
      guild.related('welcome').create(DefaultWelcomeValue)
    }

    return response.send('Guild created !')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const guild = await Guild.findBy('id', params.id)
    await guild!.delete()
    return response.send('Guild deleted')
  }
}
