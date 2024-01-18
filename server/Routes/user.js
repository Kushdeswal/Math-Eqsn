const express= require("express");
const { formData, getQuestions } = require("../Controller/user");
const router = new express();
// import uploads from "../Middleware/multer";
const uploads = require("../Middleware/multer")


router.post('/formdata'  , uploads.single('file') , formData);
router.get("/get-questions", getQuestions)
module.exports = router;