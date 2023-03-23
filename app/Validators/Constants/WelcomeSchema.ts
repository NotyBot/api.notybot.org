import { schema } from '@ioc:Adonis/Core/Validator'

export const EmbedFieldType = schema.object.optional().members({
  name: schema.string.nullable(),
  value: schema.string.nullable(),
  inline: schema.boolean.optional(),
})

export const EmbedFooterType = schema.object.optional().members({
  text: schema.string.nullable(),
  iconUrl: schema.string.nullable(),
})

export const EmbedSchema = schema.object.optional().members({
  description: schema.string(),
  color: schema.string(),
  fields: schema.array().members(EmbedFieldType),
  footer: EmbedFooterType,
})
