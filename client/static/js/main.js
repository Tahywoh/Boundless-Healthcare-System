$(document).ready(function () {
  $('ul.tabs').tabs()
  $('form').submit(function (e) {
    e.preventDefault()
  })
  $('div.book-appointment #reason').val('New Text')
  $('div.book-appointment #reason').trigger('autoresize')
})
