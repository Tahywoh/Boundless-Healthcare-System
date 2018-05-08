// var moment = require('moment')
// var date = moment()
// var formatedTime = date.format('MMM D, YYYY') + ` ` + date.format('h:mm a')
var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date()
  }
}
var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date()
  }
}

module.exports = {generateMessage, generateLocationMessage}
