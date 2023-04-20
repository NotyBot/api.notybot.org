import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Bot', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should return api credential', async ({ client, assert }) => {
    const response = await client.post('/v1/api-credentials')

    assert.equal(response.status(), 200)
  })

  test('should return token', async ({ client, assert }) => {
    const response = await client
      .post('/v1/bot')
      .json({
        api_key: '82117a012388a81c05818834139b3ed5',
        api_secret: '30fb9bc0674b0d5841ddc673a4f18a4b858cf507325efa20dcf8fb7bd308111d',
      })
      .send()

    assert.equal(response.status(), 200)
  })
})
