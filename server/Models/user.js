const mongoose = require('mongoose');
// const schema = mongoose.Schema
const userSchema = mongoose.Schema({
    question:{
        required:true,
        type:String,
    },
    option1:{
        required: true,
        type:String,
        unique:true,
    },
    option2:{
        required: true,
        type:String,
        unique:true,
    },
    option3:{
        required: true,
        type:String,
        unique:true,
    },
    option4:{
        required: true,
        type:String,
        unique:true,
    },
    correctAnswer:{
        required:true,
        type:String,
    },
    formulaImage: {
        type: Buffer,
      },
    
});


const user = mongoose.model("user", userSchema);

module.exports = user;
// module.exports = user = mongoose.model('questionbank' , userSchema)