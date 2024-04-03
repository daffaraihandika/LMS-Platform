import express from "express";
import { upload } from "../middleware/multer.js";

import {
  createQuiz,
  getQuizByUser,
  getQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("tess");
});

router.post("/new-quiz", upload.single("image"), createQuiz);
router.get("/quizzes", getQuiz);
router.get("/quizzes/user/:userId", getQuizByUser);
router.delete("/quiz/:id", deleteQuiz);

export default router;
