import { BaseCommand } from '@adonisjs/core/build/standalone'
export default class TokenClear extends BaseCommand {
  public static commandName = 'token:clear'
  public static description = 'Clear expired API tokens'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const Database = (await import('@ioc:Adonis/Lucid/Database')).default
    const expiredTokens = await Database.query()
      .from('api_tokens')
      .where('expires_at', '<', new Date())
    await Database.query()
      .whereIn(
        'id',
        expiredTokens.map((token) => token.id)
      )
      .delete()
    this.logger.info(`Deleted ${expiredTokens.length} expired tokens`)
  }
}
