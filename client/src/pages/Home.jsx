import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Popover,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Edit } from "@mui/icons-material";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [anchorEl, setAnchorEl] = useState("");
  const [editTask, setEditTask] = useState({
    id: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/tasks");
      console.log(response.data);
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

  const handleEditPopoverOpen = (e, task) => {
    setAnchorEl(e.currentTarget);
    setEditTask({
      id: task.id,
      title: task.title,
      description: task.description,
    });
  };

  const handleEditPopoverClose = () => {
    setEditTask({ id: null, title: "", description: "" });
    setAnchorEl(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/${editTask.id}`, {
        title: editTask.title,
        description: editTask.description,
      });
      fetchTasks();
      setEditTask({ id: null, title: "", description: "" });
      handleEditPopoverClose();
    } catch (error) {
      console.log(error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <Box>
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
                <Box>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={(e) => handleEditPopoverOpen(e, task)}>
                    <Edit />
                  </IconButton>
                </Box>
              }>
              <ListItemText
                primary={`${index + 1}) ${task.title}`}
                secondary={task.description || "No description"}
              />
            </ListItem>
          ))}
        </List>
      </Container>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleEditPopoverClose}
        anchorOrigin={{ vertical: "left", horizontal: "left" }}
        anchorPosition={{ vertical: "left", horizontal: "center" }}>
        <Box
          component="form"
          onSubmit={handleEditSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
          <TextField
            required
            label="title"
            value={editTask.title}
            onChange={(e) => {
              setEditTask({ ...editTask, title: e.target.value });
            }}
          />
          <TextField
            label="description"
            value={editTask.description}
            multiline
            rows={3}
            onChange={(e) => {
              setEditTask({ ...editTask, description: e.target.value });
            }}
          />
          <Button variant="contained" type="submit">
            Update Task
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default Home;
