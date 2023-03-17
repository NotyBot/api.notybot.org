import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class SocialAuthsController {
  public async redirect({ ally, auth, params, response }: HttpContextContract) {
    if (await auth.check()) {
      return response.notAcceptable()
    }
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, response, params, auth }: HttpContextContract) {
    try {
      const provider = ally.use(params.provider)

      if (provider.accessDenied()) {
        return response.send('Access was denied')
      }

      if (provider.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      if (provider.hasError()) {
        return provider.getError()
      }

      const providerUser = await provider.user()

      const user = await User.firstOrCreate(
        {
          email: providerUser.email!,
        },
        {
          username: providerUser.name,
          provider: params.provider,
          providerId: providerUser.id,
        }
      )

      const oat = await auth.use('api').login(user)

      return response.redirect().toPath(`http://localhost:4200/authentication?token=${oat.token}`)
    } catch (error) {
      console.log(error)
    }
  }
}
