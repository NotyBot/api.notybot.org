import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guild from 'App/Models/Guild'

export default class GuildsController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.body()

    await Guild.create(data)

    return response.send('Guild created !')
  }
}
