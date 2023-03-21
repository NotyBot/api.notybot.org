/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  //AUTHENTICATION
  Route.group(() => {
    Route.get('/:provider', 'Auth/SocialAuthsController.redirect')
    Route.get('/:provider/callback', 'Auth/SocialAuthsController.callback')
    Route.get('/me', 'UsersController.me').middleware('auth:api')
  }).prefix('oauth')

  //GESTION DU BOT
  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'Bot/GuildsController.index')
      Route.post('/', 'Bot/GuildsController.store')
      Route.delete('/', 'Bot/GuildsController.destroy')
    }).prefix('/guild')
    Route.group(() => {
      Route.get('/:guildId', 'Bot/WelcomesController.show')
    }).prefix('/welcome')
  })
    .prefix('/bot')
    .middleware('rest')

  //NEWSLETTER
  Route.group(() => {
    Route.post('/newsletter', 'NewsLettersController.store')
    Route.delete('/newsletter/:email', 'NewsLettersController.destroy').as('newsletter.delete')
  }).prefix('/newsletter')
}).prefix('/v1')
