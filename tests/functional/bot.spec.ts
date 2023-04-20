import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import ApiCredential from 'App/Models/ApiCredential'

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
    const data = await ApiCredential.query().firstOrFail()
    const response = await client
      .post('/v1/bot')
      .json({
        api_key: data.api_key,
        api_secret: data.api_secret,
      })
      .send()

    assert.equal(response.status(), 200)
  })

  test('should return error when api key is invalid', async ({ client, assert }) => {
    const data = await ApiCredential.query().firstOrFail()
    const response = await client
      .post('/v1/bot')
      .json({
        api_key: 'invalid',
        api_secret: data.api_secret,
      })
      .send()

    assert.equal(response.status(), 401)
  })

  test('should return error when api secret is invalid', async ({ client, assert }) => {
    const data = await ApiCredential.query().firstOrFail()
    const response = await client
      .post('/v1/bot')
      .json({
        api_key: data.api_key,
        api_secret: 'invalid',
      })
      .send()

    assert.equal(response.status(), 401)
  })
})
