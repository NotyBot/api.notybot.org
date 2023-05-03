import ApiCredential from 'App/Models/ApiCredential'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import * as crypto from 'crypto'

export default class ApiCredentialsController {
  public async store({}: HttpContextContract) {
    return await ApiCredential.create({})
  }

  public async update({ response, params }: HttpContextContract) {
    const apiCredential = await ApiCredential.findBy('api_key', params.api_key)

    if (!apiCredential) {
      return response.unauthorized('Invalid API Key')
    }

    const apiSecret = await apiCredential
      .merge({
        api_secret: crypto.randomBytes(32).toString('hex'),
      })
      .save()

    return response.send(apiSecret)
  }
}
