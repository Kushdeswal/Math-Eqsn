const multer  = require('multer')
const path = require('path')


let storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, './uploads');
    },

    filename: function (req,file,cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})




const uploads = multer({storage: storage})

module.exports = uploads