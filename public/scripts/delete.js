function ajaxDelete(url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.ajax({
      url,
      method: 'DELETE',
      dataType: 'json',
      headers
    })
  )
}

function my_confirm(str) {
  // return Promise.resolve(
  //   confirm(str)
  // )
  let _resolve, _reject

  const $modal = $('.confirm-modal')
  const $btnOk = $modal.find('.modal-ok')
  const $btnCancel = $modal.find('.modal-cancel')
  $modal.modal('show')

  // először vegyük le az esetlegesen előzőleg felregisztrált kezelőt,
  // különben második, stb. confirmkor az előzőek is lefutnak ismét
  // (ha majd esetleg listázó oldalon is használjuk a my_confirm-öt)
  $btnOk.off('click')
  $btnOk.on('click', function (e) {
    _resolve(true)
  })

  $btnCancel.off('click')
  $btnCancel.on('click', function (e) {
    _resolve(false)
  })

  return new Promise(function (resolve, reject) {
    _resolve = resolve
    _reject = reject
  })
}

$('#btnDelete').on('click', function (e) {
  e.preventDefault()
  my_confirm('Biztosan törlöd a receptet?')
    .then(response => {
      if (response) {
        const url = '/ajax' + $(this).attr('href');
        // /ajax/recipe/3/delete
        ajaxDelete(url)
          .then(data => {
            location.assign('/')
          })
          .catch(xhr => {
            $('.help-block').text(xhr.responseText)
          })
      }
    })
})