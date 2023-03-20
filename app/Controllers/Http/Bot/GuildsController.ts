import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GuildValidator from 'App/Validators/GuildValidator'
import Guild from 'App/Models/Guild'

export default class GuildsController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(GuildValidator)
    console.log(data)

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
}
