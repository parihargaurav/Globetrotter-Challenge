import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// GET /api/questions - Fetch all questions
router.get("/quiz/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: '❌ Server Error' });
  }
});

export default router;
