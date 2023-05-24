import Route from '@ioc:Adonis/Core/Route'
import * as process from 'process'

Route.group(() => {
  Route.get('/', () => ({ uptime: process.uptime() }))
  //AUTHENTICATION
  Route.get('/me', 'Auth/AuthController.me').middleware('auth')
  Route.get('/auth/check', 'Auth/AuthController.check')
  Route.post('/auth/logout', 'Auth/AuthController.logout')
  Route.get('/oauth/:provider/redirect', 'Auth/AuthController.redirect').where(
    'provider',
    /discord/
  )
  Route.get('/oauth/:provider/callback', 'Auth/AuthController.callback').where(
    'provider',
    /discord/
  )

  //GESTION DU BOT
  Route.group(() => {
    Route.get('/', 'Bot/WelcomesController.index')
  })
    .prefix('/bot')
    .middleware('auth_bot')

  //NEWSLETTER
  Route.group(() => {
    Route.post('/', 'NewsLettersController.store')
    Route.delete('/:email', 'NewsLettersController.destroy')
  }).prefix('/newsletter')

  Route.post('/api-credentials', 'ApiCredentialsController.store')
  Route.put('/api-credentials/:api_key', 'ApiCredentialsController.update')
}).prefix('/v1')
