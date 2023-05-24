import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GuildsController {
  public async store({ request }: HttpContextContract) {
    const data = await request.body()
    console.log(data)
  }
}
