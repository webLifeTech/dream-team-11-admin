const express = require('express')
const router = express.Router()
const multer = require('multer');

exports.imageUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      let filetype = file.originalname.split('.').pop()
      cb(null, 'file_' + Date.now()+'.'+filetype)
    }
  });
  console.log("storage >>>", storage);
  return multer({ storage: storage });
}


// For update category
router.post('/file-upload', exports.imageUpload().single('file'), async (req, res) => {
  try {
    console.log("req.file>>>", req.file)
      console.log("req.body>>>", req.body);

      res.json({
          status: true,
          filename:req.file.filename,
          msg: 'File upload successfully'
      })
  } catch (error) {
      console.log("error>>", error);
      res.json({
          status: false,
          msg: 'Something went Wrong',
          error: error
      })
  }
})


module.exports = router;
