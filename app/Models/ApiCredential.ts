import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import * as crypto from 'crypto'

export default class ApiCredential extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public api_key: string

  @column()
  public api_secret: string

  @column()
  public bearer_token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateApiKey(apiCredential: ApiCredential) {
    apiCredential.api_key = crypto.randomBytes(16).toString('hex')
    apiCredential.api_secret = crypto.randomBytes(32).toString('hex')
  }
}
