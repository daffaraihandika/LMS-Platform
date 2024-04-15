import express from "express";
import { upload } from "../middleware/multer.js";

import {
  createQuiz,
  getQuizByUser,
  getQuiz, editQuiz ,
  deleteQuiz,
  getQuizById,
} from "../controllers/quizController.js";

import { getAllTags, getTagsByUserId } from "../controllers/tagController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("tess");
});

router.post("/new-quiz", upload.single("image"), createQuiz);
router.patch('/edit-quiz/:quizId', upload.single('image'), editQuiz);
router.get("/quizzes", getQuiz);
router.get("/quizzes/user/:userId", getQuizByUser);
router.get("/quizzes/:id", getQuizById);
router.delete("/quiz/:id", deleteQuiz);

router.get("/tags", getAllTags);
router.get("/tags/user/:userId", getTagsByUserId);

export default router;
