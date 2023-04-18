import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiCredential from 'app/models/api_credential'

export default class ApiCredentialsController {
  public async store({}: HttpContextContract) {
    return await ApiCredential.create({})
  }
}
