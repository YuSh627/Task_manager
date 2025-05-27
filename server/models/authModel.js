import connectToDatabase from "../lib/db.js";

export const checkEmail = async (email) => {
  const db = await connectToDatabase();
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

export const createUser = async (username, email, password) => {
  const db = await connectToDatabase();
  await db.query(
    "INSERT INTO users(username, email, password) VALUES(? ,? ,?)",
    [username, email, password]
  );
};
