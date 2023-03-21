import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Welcome extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public guildId: string

  @column()
  public channel_id: string

  @column()
  public message: string

  @column()
  public canvas: string

  @column()
  public embed: string

  @column()
  public role: string

  @column()
  public sendPrivateMessage: boolean

  @column()
  public giveRole: boolean

  @column()
  public enabled: boolean
}
