import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'welcomes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('guild_id').references('guilds.id').onDelete('CASCADE')
      table.string('channel_id').notNullable()
      table.string('message').nullable()
      table.string('canvas').nullable()
      table.string('embed').nullable()
      table.string('role').nullable()
      table.boolean('send_private_message').defaultTo(false)
      table.boolean('give_role').defaultTo(false)
      table.boolean('send_embed').defaultTo(false)
      table.boolean('enabled').defaultTo(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
