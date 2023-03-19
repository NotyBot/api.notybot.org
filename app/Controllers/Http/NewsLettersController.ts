import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Email from 'App/Models/Email'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class NewsLettersController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        email: schema.string(),
      }),
    })

    await Email.create(data)

    await Mail.send((message) => {
      message
        .from('noreply@notybot.org')
        .to(data.email)
        .subject('Sign Up for NotyBot Alpha')
        .htmlView('emails/welcome', { email: data.email })
    })

    return response.send('Email send !')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const email = await Email.findBy('email', params.email)
    await email!.delete()

    return response.redirect().toPath('https://notybot.org/newsletter/succes')
  }
}
