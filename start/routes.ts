import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
}).middleware('auth_bot')

Route.group(() => {
  //AUTHENTICATION
  Route.group(() => {
    Route.get('/:provider', 'Auth/SocialAuthsController.redirect')
    Route.get('/:provider/callback', 'Auth/SocialAuthsController.callback')
    Route.get('/me', 'UsersController.me').middleware('auth:api')
  }).prefix('oauth')

  //GESTION DU BOT
  Route.group(() => {
    Route.post('/', 'Bot/ConnectsController.store')
  }).prefix('/bot')

  //NEWSLETTER
  Route.group(() => {
    Route.post('/newsletter', 'NewsLettersController.store')
    Route.delete('/newsletter/:email', 'NewsLettersController.destroy').as('newsletter.delete')
  }).prefix('/newsletter')

  Route.post('/api-credentials', 'ApiCredentialsController.store')
}).prefix('/v1')
