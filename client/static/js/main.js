$(document).ready(function () {
  $('ul.tabs').tabs()
  $('form').submit(function (e) {
    e.preventDefault()
  })
  $('div.book-appointment #reason').val('New Text')
  $('div.book-appointment #reason').trigger('autoresize')
  // $('#address_profile').val('No 2, Balogun oke odo, tanke Ilorin, Ilorin');
  $('#address_profile').trigger('autoresize');
})
