import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async test({ response }: HttpContextContract) {
    response.ok({ message: 'Event sent' })
  }
  public me({ auth, response }: HttpContextContract) {
    if (!auth.user) {
      return response.unauthorized()
    }

    return auth.user
  }
}
