'use strict'

const Route = use('Route')

// Route.get('/hello', function * (req, res) {
//     yield res.sendView('welcome');
// })
// Route.on('/').render('main')
Route.get('/', 'RecipeController.index')
Route.get('/recipes/create', 'RecipeController.create')
Route.post('/recipes/create', 'RecipeController.doCreate')
Route.get('/recipes/:id', 'RecipeController.show')
Route.get('/recipes/:id/edit', 'RecipeController.showEdit')
Route.post('/recipes/:id/edit', 'RecipeController.doEdit')