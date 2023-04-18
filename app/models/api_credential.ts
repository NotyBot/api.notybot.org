import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'crypto'

export default class ApiCredential extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public apiKey: string

  @column()
  public apiSecret: string

  @column()
  public bearerToken: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateApiKey(apiCredential: ApiCredential) {
    apiCredential.apiKey = randomUUID()
    apiCredential.apiSecret =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}
