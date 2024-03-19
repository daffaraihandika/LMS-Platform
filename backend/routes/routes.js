import express from "express";
import { upload } from "../middleware/multer.js";

import { createQuiz } from "../controllers/quizController.js";


const router = express.Router();

router.get('/', (req, res) => {
    res.send('tess')
});

router.post('/new-quiz', upload.single('image'), createQuiz)

export default router;