import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('email', 255).notNullable()
      table.string('username').notNullable()
      table.string('provider')
      table.string('provider_id')
      table.boolean('is_admin').defaultTo(false)
      table.string('avatar_url').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
