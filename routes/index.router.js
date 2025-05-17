const express = require('express')
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1716052342343.jpg
  }
})
const upload = multer({ storage: storage });

router.get('/home',authMiddleware.authUser,(req,res)=>{
    res.render('home')
}) 
router.post('/upload-file',upload.single('myfile'),(req,res)=>{
     res.send({
      status: "success",
      message: "File uploaded successfully!",
      file: req.file
    });
})
  
module.exports = router