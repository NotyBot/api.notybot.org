import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Welcome from 'App/Models/Welcome'

export default class Guild extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public channels: Array<ChannelType>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Welcome)
  public welcome: HasOne<typeof Welcome>
}

export interface ChannelType {
  id: string
  type: number
  name: string
  parent_id: string | null
  guild_id: string
}
