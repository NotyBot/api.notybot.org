import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public me({ auth, response }: HttpContextContract) {
    if (!auth.user) {
      return response.unauthorized()
    }

    return auth.user
  }
}
