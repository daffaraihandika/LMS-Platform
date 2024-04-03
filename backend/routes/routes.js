import express from "express";
import { getQuiz, getQuizByUser } from "../controllers/QuizController.js";
import { upload } from "../middleware/multer.js";

import {
  createQuiz,
  getQuizByUser,
  getQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("tess");
});

router.get("/quizzes", getQuiz);
router.get("/quizzes/user/:userId", getQuizByUser);
router.post("/new-quiz", upload.single("image"), createQuiz);
router.get("/quizzes", getQuiz);
router.get("/quizzes/user/:userId", getQuizByUser);

export default router;
