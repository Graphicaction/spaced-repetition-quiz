const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Define Question Schema
const QuestionSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: false },
  options: [{ type: String, required: false }],
  level: { type: Number, required: false },
});
// Create reference to Question & export
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
