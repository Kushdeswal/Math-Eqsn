const user = require("../Models/user");
const fs = require('fs');

const formData = async (req, res) => {
  
  try {
    console.log("Request received");
    
  //   if(req.file){
            
  //     req.body.formulaImage = req.file.filename;
  //     console.log("File uploaded:", req.file.filename);
  // }

  // if(req.file){
  //   const fileContent = req.file.buffer;
  //   req.body.formulaImage = fileContent;
  //   console.log("File uploaded:", req.file.originalname);
  // }
    const { question, option1, option2, option3, option4, correctAnswer } =
      req.body;
      const data = {
        question:question,
        option1:option1.split(" ")[1],
        option2:option2.split(" ")[1],
        option3:option3.split(" ")[1],
        option4:option4.split(" ")[1],
        correctAnswer:correctAnswer
      }
    const newUser = new user(data);
    await newUser.save();
    console.log("Data to be saved:", newUser);
    return res.status(201).json({
      message: "Question created!",
      result: newUser,
    });
    
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getQuestions = async (req, res) => {
  try {
    let questions = await user.find({});
    return res.status(200).json({
      message: "Questions fected",
      result: questions,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { formData, getQuestions };
