const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    //Đường dẫn lưu file callback
    destination: function (req, file, cb) {
        cb(null, 'src/public/upload')
    },

    //Tên file
    filename: function (req, file, cb) {
        cb(null, Date.now()  + "-" + file.originalname)
    }
})

const fileFilter = (req, file, cb)=> {
    if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpg" ||  file.mimetype=='image/jpeg'){
        cb(null, true)
    }else{
        return cb(new Error('Chỉ hỗ trợ hình ảnh có đuôi bmp, png, jpg, jpeg'))
    }
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter,
})

module.exports = upload