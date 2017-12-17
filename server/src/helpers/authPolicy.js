const joi = require('joi')

module.exports = {
  login(req, res, next) {
    const verifyInput = {
      email: joi.string().email(),
      password: joi.string().regex(new RegExp('^[a-zA-Z0-9]{5,32}$'))
    }
    const {error, value} = joi.validate(req.body, verifyInput)
    if (error) {
      switch(error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Your password must follow the following rules: <br/>
            1. It mst contain only lower case and upper case<br/>
            2. It must be atleast 4 characters
            `
          })
          break
          default:
            res.status(400).send({
              error: 'Invalid email or password!'
            })
      }
    } else {
      next()
    }
  }
}