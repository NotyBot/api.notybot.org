import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SocialAuth from 'App/Services/SocialAuth'

export default class SocialAuthsController {
  public async redirect({ ally, auth, params, response }: HttpContextContract) {
    if (await auth.check()) {
      return response.notAcceptable()
    }
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, auth, params, response }: HttpContextContract) {
    const socialUser = await ally.use(params.provider).user()

    // @ts-ignore
    await new SocialAuth(socialUser, params.provider).onFindOrCreate(async (user: User) => {
      const oat = await auth.use('api').login(user)
      return response.redirect().toPath(`http://localhost:4200/authentication?token=${oat.token}`)
    })
  }

  public async logout({ auth }: HttpContextContract) {
    return await auth.logout()
  }
}
