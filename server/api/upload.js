const router = require('express').Router()
const multer = require('multer')

//using a single file called upload
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1] //we want the jpg or png part
    cb(null, `${Date.now()}.${extension}`) //naming the file
  }
})
const upload = multer({
  storage,
  limits: {fileSize: 999999}
}).single('upload')
router.post('/', upload, async (req, res, next) => {
  try {
    res.send(`/uploads/${req.file.filename}`)
  } catch (err) {
    next(err)
  }
})
module.exports = router
