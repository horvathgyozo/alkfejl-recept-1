'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Recipe = use('App/Model/Recipe')

class RecipeController {

  * index(request, response) {
    // const categories = yield Database.from('categories').select('*');
    // response.send(categories)

    const categories = yield Category.all()

    for(let category of categories) {
      const recipes = yield category.recipes().limit(3).fetch();
      category.topRecipes = recipes.toJSON();
    }

    yield response.sendView('main', {
      name: 'Győző',
      categories: categories.toJSON()
    })  
  }

}

module.exports = RecipeController
