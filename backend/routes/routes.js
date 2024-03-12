import express from "express";
import { getQuiz, getQuizByUser } from "../controllers/QuizController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("tess");
});

router.get("/quizzes", getQuiz);
router.get("/quizzes/user/:userId", getQuizByUser);

export default router;
