import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Email from 'App/Models/Email'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class NewsLettersController {
  private from = 'noreply@notybot.org'
  private subject = 'Sign Up for NotyBot Alpha'
  private teamplate = 'emails/welcome'

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        email: schema.string(),
      }),
    })

    await Email.create(data)

    await Mail.send((message) => {
      message
        .from(this.from)
        .to(data.email)
        .subject(this.subject)
        .htmlView(this.teamplate, { email: data.email })
    })

    return response.send('Email send !')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const email = await Email.findBy('email', params.email)
    await email!.delete()

    return response.redirect().toPath('https://notybot.org/newsletter/succes')
  }
}
