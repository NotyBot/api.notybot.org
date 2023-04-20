import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import * as crypto from 'crypto'

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
    apiCredential.apiKey = crypto.randomBytes(16).toString('hex')
    apiCredential.apiSecret = crypto.randomBytes(32).toString('hex')
  }
}
