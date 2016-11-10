'use strict'

const Route = use('Route')

// Route.get('/hello', function * (req, res) {
//     yield res.sendView('welcome');
// })
// Route.on('/').render('main')
Route.get('/', 'RecipeController.index')
Route.get('/recipes/create', 'RecipeController.create').middleware('auth')
Route.post('/recipes/create', 'RecipeController.doCreate').middleware('auth')
Route.get('/recipes/:id/edit', 'RecipeController.edit').middleware('auth')
Route.post('/recipes/:id/edit', 'RecipeController.doEdit').middleware('auth')
Route.get('/recipes/:id/delete', 'RecipeController.doDelete').middleware('auth')
Route.get('/recipes/:id', 'RecipeController.show')
Route.get('/recipes', 'RecipeController.search')

Route.get('/register', 'UserController.register')
Route.get('/login', 'UserController.login')
Route.post('/register', 'UserController.doRegister')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')