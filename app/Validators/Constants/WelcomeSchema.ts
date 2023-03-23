import { schema } from '@ioc:Adonis/Core/Validator'

export const EmbedFieldType = schema.object.nullable().members({
  name: schema.string.nullable(),
  value: schema.string.nullable(),
  inline: schema.boolean.optional(),
})

export const EmbedFooterType = schema.object.nullable().members({
  text: schema.string.nullable(),
  iconUrl: schema.string.nullable(),
})

export const EmbedSchema = schema.object.nullable().members({
  title: schema.string.nullable(),
  description: schema.string(),
  color: schema.string(),
  fields: schema.array.nullable().members(EmbedFieldType),
  footer: EmbedFooterType,
})
