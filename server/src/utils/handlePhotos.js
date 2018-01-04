const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'))
// })

router.post('/uploads', upload.single('image'), (req, res) => {
  return res.json('success')
})

module.exports = router
