import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks. Please try again.");
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) {
      alert("Title is required");
      return;
    }

    try {
      await axios.post("/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <>
      <Navbar user={user} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box component="form" onSubmit={handleAddTask} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Task Title"
            margin="normal"
            required
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Task Description"
            margin="normal"
            multiline
            rows={3}
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Add Task
          </Button>
        </Box>
        <List>
          {tasks.map((task, index) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
              <ListItemText
                primary={`${index + 1}) ${task.title}`}
                secondary={task.description || "No description"}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Home;
