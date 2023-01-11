import path from 'path';
import express from "express";
import multer from "multer";
const router =express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`//if we put 2 images with same name/extname:extentionname
      )
    },
  })
  function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())//it will return true or false if is it match one of the  filestypes
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Images only!')
    }
  }

  const upload = multer({// this will pass on middleware
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })

  router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
  })
  
  
export default router