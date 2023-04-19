import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ApiCredential from 'App/Models/ApiCredential'

export default class extends BaseSeeder {
  public async run() {
    await ApiCredential.create({
      apiKey: '2002835d-aef3-4404-9a9c-aef8f2a66ef5',
      apiSecret: 'hndpku9juxqxzugqqud3z',
    })
  }
}
