import { WelcomeData } from 'App/Validators/WelcomeValidator'
export interface WelcomeType {
  channel_id: string
  message: string
  canvas: string | null
  embed: WelcomeData['embed']
  role: string | null
  send_private_message: boolean
  give_role: boolean
  enabled: boolean
}
export const DefaultWelcomeValue: WelcomeType = {
  channel_id: '456789456875446',
  message: 'test',
  canvas: null,
  embed: null,
  role: '',
  send_private_message: false,
  give_role: false,
  enabled: false,
}
