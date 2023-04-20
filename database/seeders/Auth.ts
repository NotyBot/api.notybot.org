import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ApiCredential from 'App/Models/ApiCredential'

export default class extends BaseSeeder {
  public async run() {
    await ApiCredential.create({
      api_key: '82117a012388a81c05818834139b3ed5',
      api_secret: '30fb9bc0674b0d5841ddc673a4f18a4b858cf507325efa20dcf8fb7bd308111d',
    })
  }
}
