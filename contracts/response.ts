declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    globalSuccess(message: string, code?: number): void
    globalError(message: string, code?: number): void
    unauthorized(message: string, code?: number): void
  }
}
