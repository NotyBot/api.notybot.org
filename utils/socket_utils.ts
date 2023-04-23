import { NotySendCode, PayloadType } from '../types'
import { Socket } from 'node:net'

export async function sendHello(payload: PayloadType, client: Socket) {
  const apiCredentialModel = (await import('App/Models/ApiCredential')).default
  const apiCredential = await apiCredentialModel.findBy('api_key', payload.data['api_key'])

  if (!apiCredential) {
    client.end()
    return
  }

  if (apiCredential.api_secret !== payload.data['api_secret']) {
    client.end()
    return
  }

  apiCredential.bearer_token =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  await apiCredential.save()

  client.write(
    JSON.stringify({
      code: NotySendCode.HELLO,
      data: {
        heartbeat_interval: 1250,
        bearer_token: apiCredential.bearer_token,
      },
    })
  )
}
