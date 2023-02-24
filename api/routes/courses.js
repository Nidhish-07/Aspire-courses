import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/course.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createCourse);
router.delete("/:id", verifyToken, deleteCourse);
router.post("/:id", verifyToken, updateCourse);
router.get("/single/:id", getCourse);
router.get("/", getCourses);

export default router;
