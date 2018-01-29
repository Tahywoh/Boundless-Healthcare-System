const http = require('http')
const port = process.env.PORT || 7070
let server
var dServer = () => {
  server = http.createServer(require('express')())
}

var serveUs = () => {
  dServer()
  server.listen(port, () => {
    console.log(`server is running on port`, port)
  })
}

module.exports = {serveUs, dServer}
