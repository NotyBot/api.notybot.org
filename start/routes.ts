import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/newsletter', 'NewsLettersController.store')
  Route.delete('/newsletter/:email', 'NewsLettersController.destroy').as('newsletter.delete')
}).prefix('/v1')
