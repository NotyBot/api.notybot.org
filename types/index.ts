export interface PayloadType {
  code: number
  data: object
}

export enum NotySendCode {
  HELLO = 0,
}

export const HelloPayload: PayloadType = {
  code: NotySendCode.HELLO,
  data: {
    heartbeat_interval: 1250,
  },
}

export enum NotyReceiveCode {
  AUTH = 0,
  HEARTBEAT = 1,
}
