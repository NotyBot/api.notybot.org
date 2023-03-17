import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public me({ auth }: HttpContextContract) {
    return auth.user!
  }
}
