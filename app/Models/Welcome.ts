import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { WelcomeData } from 'App/Validators/WelcomeValidator'

export default class Welcome extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public guild_id: string

  @column()
  public channel_id: string

  @column()
  public message: string

  @column()
  public canvas: string | null

  @column()
  public embed: WelcomeData['embed']

  @column()
  public role: string | null

  @column()
  public send_private_message: boolean

  @column()
  public give_role: boolean

  @column()
  public enabled: boolean
}
