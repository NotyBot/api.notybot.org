import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GuildValidator from 'App/Validators/GuildValidator'
import Guild from 'App/Models/Guild'

export default class GuildsController {
  public async index({}: HttpContextContract) {
    const data = await Guild.query().where('id', '1061557112783781898').first()
    console.log(data)
  }
  public async store({ request, response }: HttpContextContract) {
    console.log(await request.body())
    const data = await request.validate(GuildValidator)

    await Guild.updateOrCreate(
      {
        id: data.id,
      },
      {
        id: data.id,
        name: data.name,
        channels: data.channels,
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
