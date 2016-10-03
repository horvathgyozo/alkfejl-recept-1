'use strict'

const Route = use('Route')

// Route.get('/hello', function * (req, res) {
//     yield res.sendView('welcome');
// })
Route.on('/').render('main')
