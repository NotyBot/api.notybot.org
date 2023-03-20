import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GuildChannelValidator from 'App/Validators/GuildChannelValidator'
import GuildChannel from 'App/Models/GuildChannel'

export default class GuildChannelsController {
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(GuildChannelValidator)

    await GuildChannel.updateOrCreate(
      {
        guildId: data.guild_id,
      },
      {
        guildId: data.guild_id,
        content: data.content,
      }
    )

    return 'Test'
  }
}
