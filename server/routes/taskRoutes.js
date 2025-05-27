import express from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, addTask);
router.delete("/:id", verifyToken, deleteTask);
router.put("/:id", verifyToken, updateTask);

export default router;
