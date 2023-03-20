import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GuildValidator from 'App/Validators/GuildValidator'
import Guild from 'App/Models/Guild'

export default class GuildsController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(GuildValidator)

    await Guild.updateOrCreate(
      {
        id: data.id,
      },
      {
        ...data,
      }
    )

    return response.send('Guild created !')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const guild = await Guild.findBy('id', params.id)
    await guild!.delete()
    return response.send('Guild deleted')
  }
}
