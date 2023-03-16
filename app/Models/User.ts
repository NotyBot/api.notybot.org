import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public username: string

  @column()
  public isAdmin: boolean

  @column()
  public email: string

  @column()
  public provider: string

  @column()
  public providerId: string

  @column()
  public hasEmailConfirmed: boolean
}
