import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'welcomes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('guild_id', 255).notNullable()
      table.string('channel_id', 255).notNullable()
      table.string('message', 255).notNullable()
      table.json('canvas').nullable()
      table.json('embed').nullable()
      table.string('role').nullable()
      table.boolean('send_private_message').defaultTo(false)
      table.boolean('send_when_leave').defaultTo(false)
      table.boolean('send_when_join').defaultTo(false)
      table.boolean('enabled').defaultTo(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
