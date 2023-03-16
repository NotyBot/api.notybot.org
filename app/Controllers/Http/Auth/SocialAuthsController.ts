import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SocialAuthsController {
  public async redirect({ ally, params, auth, response }: HttpContextContract) {
    if (await auth.check()) {
      return response.notAcceptable()
    }
    return ally.use(params.provider).redirect()
  }
}
