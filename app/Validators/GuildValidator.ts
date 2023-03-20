import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GuildValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string(),
    name: schema.string(),
    channels: schema.array().members(ContentSchema),
  })

  public messages: CustomMessages = {}
}

export const ContentSchema = schema.object().members({
  id: schema.string(),
  type: schema.number(),
  name: schema.string(),
  parent_id: schema.string.nullable(),
  guild_id: schema.string(),
})
