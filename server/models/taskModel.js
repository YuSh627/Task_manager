import connectToDatabase from "../lib/db.js";

export const getAllTasks = async (user_id) => {
  const db = await connectToDatabase();
  const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [
    user_id,
  ]);
  return tasks;
};

export const createTask = async (user_id, title, description) => {
  const db = await connectToDatabase();
  await db.query(
    "INSERT INTO tasks(user_id, title, description) VALUES(?, ?, ?)",
    [user_id, title, description]
  );
};

export const removeTask = async (task_id, user_id) => {
  const db = await connectToDatabase();
  const [result] = await db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [task_id, user_id]
  );
  return result;
};

export const editTask = async (task_id, user_id, title, description) => {
  const db = await connectToDatabase();
  const [result] = await db.query(
    "UPDATE tasks SET title = ?, description = ? WHERE id = ? and user_id =?",
    [title, description, task_id, user_id]
  );
  return result;
};
