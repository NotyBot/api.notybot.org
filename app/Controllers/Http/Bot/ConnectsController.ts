import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConnectValidator from 'App/Validators/Bot/ConnectValidator'
import ApiCredential from 'App/Models/ApiCredential'

export default class ConnectsController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(ConnectValidator)
    const apiCredential = await ApiCredential.findBy('api_key', data.api_key)

    if (!apiCredential) {
      return response.status(401).json({ message: 'Api Key invalid' })
    }

    if (apiCredential.api_secret !== data.api_secret) {
      return response.status(401).json({ message: 'Api Secret invalid' })
    }

    apiCredential.bearer_token =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    await apiCredential.save()

    return response.status(200).json({ bearer_token: apiCredential.bearer_token })
  }
}
