import express from "express";
import {
  createQuiz,
  getQuiz,
  getQuizByUser,
} from "../controllers/QuizController.js";
import {
  getUsers,
  getUserById,
  createUser,
} from "../controllers/UserController.js";
import {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from "../controllers/TagController.js";

const router = express.Router();

// Rute untuk Quiz
router.post("/quizzes", createQuiz);
router.get("/quizzes", getQuiz);
router.get("/quizzes/user/:userId", getQuizByUser);

// Rute untuk User
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);

// Rute untuk Tag
router.get("/tags", getTags);
router.get("/tags/:id", getTagById);
router.post("/tags", createTag);
router.put("/tags/:id", updateTag);
router.delete("/tags/:id", deleteTag);

export default router;