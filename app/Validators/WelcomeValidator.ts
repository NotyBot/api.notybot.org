import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EmbedSchema } from 'App/Validators/Constants/WelcomeSchema'

export type WelcomeData = WelcomeValidator['schema']['props']
export default class WelcomeValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    channel_id: schema.string(),
    message: schema.string.nullable(),
    canvas: schema.string.nullable(),
    embed: EmbedSchema,
    role: schema.string.nullable(),
    send_private_message: schema.boolean(),
    give_role: schema.boolean(),
    send_embed: schema.boolean(),
    enabled: schema.boolean(),
  })
  public messages: CustomMessages = {}
}
