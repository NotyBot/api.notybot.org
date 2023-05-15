import { AllyUserContract, SocialProviders, DiscordToken } from '@ioc:Adonis/Addons/Ally'
import User from 'App/Models/User'

export default class SocialAuth implements Promise<void> {
  private findOrCreateHandler: any

  constructor(
    private socialUser: AllyUserContract<DiscordToken>,
    private provider: keyof SocialProviders
  ) {}

  public onFindOrCreate(cb: any) {
    this.findOrCreateHandler = cb
    return this
  }

  public async exec(): Promise<void> {
    let user = await this.updateOrCreate()

    await this.findOrCreateHandler(user)
  }

  private updateOrCreate() {
    return User.firstOrCreate(
      {
        id: this.socialUser.id,
      },
      {
        id: this.socialUser.id,
        email: this.socialUser.email!,
        username:
          this.socialUser.nickName ?? this.socialUser.name ?? this.socialUser.email!.split('@')[0],
        provider: this.provider,
        providerId: this.socialUser.id,
      }
    )
  }

  /**
   * Implementation of `then` for the promise API
   */
  public then(resolve: any, reject?: any): any {
    return this.exec().then(resolve, reject)
  }

  /**
   * Implementation of `catch` for the promise API
   */
  public catch(reject: any): any {
    return this.exec().catch(reject)
  }

  /**
   * Implementation of `finally` for the promise API
   */
  public finally(fullfilled: any) {
    return this.exec().finally(fullfilled)
  }

  /**
   * Required when Promises are extended
   */
  public get [Symbol.toStringTag]() {
    return this.constructor.name
  }
}
