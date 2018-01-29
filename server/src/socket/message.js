var moment = require('moment')
var date = moment()
var formatedTime = date.format('MMM D, YYYY') + ` &nbsp;&nbsp; ` + date.format('h:mm a')
var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: formatedTime
  }
}
var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: formatedTime
  }
}
console.log(formatedTime)
module.exports = {generateMessage, generateLocationMessage}
