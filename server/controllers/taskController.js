import {
  createTask,
  editTask,
  getAllTasks,
  removeTask,
} from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const tasks = await getAllTasks(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addTask = async (req, res) => {
  const { userId } = req.user;
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    await createTask(userId, title, description);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const result = await removeTask(id, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, description } = req.body;
  try {
    const result = await editTask(id, userId, title, description);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
