const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    questionName: { type: String, required: true },  
    options: { type: [String], required: true },     
    correctAnswer: { type: Number, required: true }  
});
const chapterSchema = new mongoose.Schema({
    chapterName: { type: String, required: true, unique: true }, 
    questions: { type: [questionSchema], required: true }      
});

module.exports = mongoose.model("Chapters", chapterSchema);
