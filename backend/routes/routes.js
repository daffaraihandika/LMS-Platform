import express from "express";
import { upload } from "../middleware/multer.js";

import { createQuiz, getQuizByUser, getQuiz, editQuiz } from "../controllers/quizController.js";


const router = express.Router();

router.get('/', (req, res) => {
    res.send('tess')
});

router.post('/new-quiz', upload.single('image'), createQuiz)
router.patch('/edit-quiz/:quizId', upload.single('image'), editQuiz)
router.get("/quizzes", getQuiz);
router.get("/quizzes/user/:userId", getQuizByUser);

export default router;