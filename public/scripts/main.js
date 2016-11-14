// console.log( $('li') )
// console.log( $('.navbar-brand') )
// console.log( $('[class|=col]') )
// console.log( $('.list-group > .list-group-item:nth-child(1)') )
// console.log( $('.list-group').children('.list-group-item') )
// console.log( $('.list-group').find('.list-group-item') )

/*
const el = $('li.list-group-item').eq(2)
console.log(el)
// const heading = el.parent().prev()
// const heading = el.closest('.panel').children('.panel-heading')
const heading = el.closest('ul').siblings('.panel-heading')
console.log(heading.text())
*/

const $recipes = $('li.list-group-item')
$recipes.each(function (i, el) {
    const $el = $(el); 
    if ($el.text().trim().length < 5) {
        $el.css('border', '1px solid red')
    }
})

const $list = $('<ul />')
$('.panel-heading').each((i, el) => {
    $('<li />')
        .html($(el).text().trim())
        .appendTo($list)
})
$('body').append($list)

