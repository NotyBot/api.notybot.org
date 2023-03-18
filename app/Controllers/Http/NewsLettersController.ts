import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Email from 'App/Models/Email'

export default class NewsLettersController {
  public async store({ request, response }: HttpContextContract) {
    const newEmailSchema = schema.create({
      email: schema.string(),
    })
    const data = await request.validate({ schema: newEmailSchema })

    await Email.create(data)

    return response.send('Email added !')
  }
}
