function parseIngredients(text) {
  return text.split('\n').map(line => {
    const arr = line.split(' ')
    return {
      amount: arr.shift(),
      name: arr.join(' ')
    }
  })
}

function insertIngredientRow(ingredient, $textarea) {
  const $row = $(`
    <div class="form-group smart-ingredient">
      <div class="col-md-3">
        <input required pattern="^\\S*$" class="form-control smart-ingredient-amount" value="${ingredient.amount}" type="text">
      </div>
      <div class="col-md-7">
        <input required class="form-control smart-ingredient-name" value="${ingredient.name}" type="text">
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-danger btn-block">
          <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  `)
  
  const $removeButton = $row.find('button')
  $removeButton.on('click', function (e) {
    const $this = $(this)
    $this.closest('.smart-ingredient').remove()
  })

  $row.insertBefore($textarea)
}

function collectIngredients() {
  const ingredients = []
  $('.smart-ingredient').each(function () {
    const $this = $(this)
    const amount = $this.find('.smart-ingredient-amount').val()
    const name = $this.find('.smart-ingredient-name').val()
    ingredients.push({
      amount, name
    })
  })
  return ingredients.map(ingredient =>
    ingredient.amount + ' ' + ingredient.name
  ).join('\n')
}

const $textarea = $('#ingredients')

const ingredients = parseIngredients( $textarea.val() )
ingredients.forEach(ingredient => {
  insertIngredientRow(ingredient, $textarea)
})

const $addButton = $(`
  <button type="button" class="btn btn-success btn-block">
    <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
  </button>
`)
  .insertAfter($textarea)
  .on('click', function (e) {
    insertIngredientRow({amount: '',name: ''},
      $textarea)
  })

$textarea.hide()

$('form').on('submit', function (e) {
  const text = collectIngredients()
  if (text.trim() === '') {
    e.preventDefault()
  } else {
    $textarea.val( text ) 
  }
})
