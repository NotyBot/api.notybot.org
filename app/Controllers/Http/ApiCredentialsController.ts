import ApiCredential from 'App/Models/ApiCredential'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ApiCredentialsController {
  public async store({}: HttpContextContract) {
    return await ApiCredential.create({})
  }
}
