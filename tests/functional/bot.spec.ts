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

  test('renew api secret', async ({ client, assert }) => {
    const data = await ApiCredential.first()
    const response = await client.put(`/v1/api-credentials/${data?.id}`)
    assert.equal(response.status(), 200)
  })
})
