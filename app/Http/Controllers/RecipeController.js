'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Recipe = use('App/Model/Recipe')
const Validator = use('Validator')

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

  * create (request, response) {
    const categories = yield Category.all()
    yield response.sendView('recipeCreate', {
      categories: categories.toJSON()
    });
  }

  * doCreate (request, response) {
    const recipeData = request.except('_csrf');

    const rules = {
      name: 'required',
      ingredients: 'required',
      instructions: 'required',
      category_id: 'required'
    };

    const validation = yield Validator.validateAll(recipeData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    recipeData.user_id = 1
    const recipe = yield Recipe.create(recipeData)
    // response.send(recipe.toJSON())
    response.redirect('/')
  }

  * show (request, response) {
    const id = request.param('id');
    const recipe = yield Recipe.find(id);
    yield recipe.related('category').load();
    // response.send(recipe.toJSON())

    yield response.sendView('recipeShow', {
      recipe: recipe.toJSON()
    })
  }

  * showEdit (request, response) {
    const id = request.param('id');
    const recipe = yield Recipe.find(id);
    yield recipe.related('category').load();
    // response.send(recipe.toJSON())
    const categories = yield Category.all()

    yield response.sendView('recipeEdit', {
      categories: categories.toJSON(),
      recipe: recipe.toJSON()
    })
  }

  * doEdit (request, response) {
    const recipeData = request.except('_csrf');

    const rules = {
      name: 'required',
      ingredients: 'required',
      instructions: 'required',
      category_id: 'required'
    };

    const validation = yield Validator.validateAll(recipeData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    recipeData.user_id = 1
    recipeData.id = 5
    const recipe = yield Recipe.create(recipeData)
    // response.send(recipe.toJSON())
    response.redirect('/')
  }

}

module.exports = RecipeController
