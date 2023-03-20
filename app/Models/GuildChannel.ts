import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GuildChannel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public guildId: string

  @column()
  public content: ContentType[] | undefined
}

export interface ContentType {
  id: string
  type: number
  name: string
  parent_id: string | null
  guild_id: string
}
