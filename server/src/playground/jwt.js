const jwt = require('jsonwebtoken')
var data = {
	id: 8
}

var token = jwt.sign(data, 'adeshina125')
console.log(token)

var decoded = jwt.verify(token, 'adeshina125')
console.log('decoded', decoded)

