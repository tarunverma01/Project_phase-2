import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./App.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get("https://fullstack-task-manager-backend.onrender.com/api/tasks", {
        headers: {
          Authorization: token
        }
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const addTask = async () => {
    try {
      await axios.post(
        "https://fullstack-task-manager-backend.onrender.com/api/tasks",
        {
          title,
          description
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://fullstack-task-manager-backend.onrender.com/api/tasks/${id}`, {
        headers: {
          Authorization: token
        }
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
  <div className="dashboard-container">
    <div className="dashboard-box">
      <div className="top-bar">
        <h1>Task Manager</h1>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      <div className="form-box">
        <input
          value={title}
          placeholder="Enter task title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          value={description}
          placeholder="Enter task description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <h2 className="task-heading">My Tasks</h2>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Dashboard;