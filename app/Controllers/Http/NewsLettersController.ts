import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Email from 'App/Models/Email'
import Mail from '@ioc:Adonis/Addons/Mail'
import { rules } from '@adonisjs/validator/build/src/Rules'

export default class NewsLettersController {
  private from = 'noreply@notybot.org'
  private subject = 'Sign Up for NotyBot Alpha'
  private template = 'emails/welcome'

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.email(),
          rules.unique({ table: 'emails', column: 'email' }),
        ]),
      }),
    })

    await Email.create(data)

    await Mail.send((message) => {
      message
        .from(this.from)
        .to(data.email)
        .subject(this.subject)
        .htmlView(this.template, { email: data.email })
    })

    return response.globalSuccess('Email send')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const email = await Email.findBy('email', params.email)
    await email!.delete()

    return response.globalSuccess('Email deleted')
  }
}
