import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'guild_channels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('guild_id').references('users.id').onDelete('CASCADE')
      table.text('content').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
