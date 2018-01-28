var moment = require('moment')
var date = moment()
date = date.format('MMM D, YYYY') + `\n` + date.format('h:mm a')
console.log(date)
