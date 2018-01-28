
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: `mongodb://BHS:adeshina@ds033196.mlab.com:33196/boundless_healthcare_system`
  }
} else {
  module.exports = {
    mongoURI: `mongodb://localhost/BHS`
  }
}
