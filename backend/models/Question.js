// models/Quiz.js
import mongoose from "mongoose";

const questionSchema =  new mongoose.Schema({
  clue: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  funFact: { type: String, required: false }, // optional if you want
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
