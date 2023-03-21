import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GuildValidator from 'App/Validators/GuildValidator'
import Guild from 'App/Models/Guild'
import Welcome from 'App/Models/Welcome'

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
      guild.related('welcome').create({
        channel_id: '456789456875446',
        message: 'test',
        canvas: '',
        embed: '',
        role: '',
        sendPrivateMessage: false,
        giveRole: false,
        enabled: false,
      })
    }

    return response.send('Guild created !')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const guild = await Guild.findBy('id', params.id)
    await guild!.delete()
    return response.send('Guild deleted')
  }
}
