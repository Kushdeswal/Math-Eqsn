const express= require('express');
const user = require('./user')
const router = new express.Router(); // same as new express();

router.use('/user' , user)


module.exports = router;