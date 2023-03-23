import { WelcomeData } from 'App/Validators/WelcomeValidator'
export interface WelcomeType {
  channel_id: string
  message: string
  canvas: string | null
  embed: WelcomeData['embed']
  role: string | null
  send_private_message: boolean
  give_role: boolean
  send_embed: boolean
  enabled: boolean
}
export const DefaultWelcomeValue: WelcomeType = {
  channel_id: '456789456875446',
  message: 'Hey {user}, welcome to **{server}**!',
  canvas: null,
  embed: {
    title: 'null',
    description: 'Hey {user}, welcome tp ** {server} **!',
    color: '#fff',
    fields: null,
    footer: null,
  },
  role: '',
  send_private_message: false,
  give_role: false,
  send_embed: false,
  enabled: false,
}
