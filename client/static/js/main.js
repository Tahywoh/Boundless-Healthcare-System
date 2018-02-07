// import $ from 'jquery'
$(document).ready(function () {
  $('ul.tabs').tabs()
  $('form').submit(function (e) {
    e.preventDefault()
  })
  $('div.book-appointment #reason').val('New Text')
  $('div.book-appointment #reason').trigger('autoresize')
  // $('#address_profile').val('No 2, Balogun oke odo, tanke Ilorin, Ilorin')
  $('#address_profile').trigger('autoresize')
  $('.collapsible').collapsible()

  // $('.timepicker').pickatime({
  //   default: 'now', // Set default time: 'now', '1:30AM', '16:30'
  //   fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
  //   twelvehour: false, // Use AM/PM or 24-hour format
  //   donetext: 'OK', // text for done-button
  //   cleartext: 'Clear', // text for clear-button
  //   canceltext: 'Cancel', // Text for cancel-button
  //   autoclose: false, // automatic close timepicker
  //   ampmclickable: true, // make AM PM clickable
  //   aftershow: function(){} //Function for after opening timepicker
  // });
})
