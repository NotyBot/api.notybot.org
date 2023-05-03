import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public me({ auth, response }: HttpContextContract) {
    if (!auth.user) {
      return response.unauthorized('You must be logged in to perform this action')
    }

    return auth.user
  }
}
