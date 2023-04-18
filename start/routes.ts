import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  //AUTHENTICATION
  Route.group(() => {
    Route.get('/:provider', 'auth/social_auths_controller.redirect')
    Route.get('/:provider/callback', 'auth/social_auths_controller.callback')
    Route.get('/me', 'users_controller.me').middleware('auth:api')
  }).prefix('oauth')

  //GESTION DU BOT
  Route.group(() => {
    Route.post('/', 'bot/connects_controller.store')
  }).prefix('/bot')

  //NEWSLETTER
  Route.group(() => {
    Route.post('/newsletter', 'news_letters_controller.store')
    Route.delete('/newsletter/:email', 'news_letters_controller.destroy').as('newsletter.delete')
  }).prefix('/newsletter')

  Route.post('/api-credentials', 'api_credentials_controller.store')
}).prefix('/v1')
