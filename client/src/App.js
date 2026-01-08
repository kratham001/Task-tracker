import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

// Uses your .env variable, or falls back to localhost
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_BASE);
      // Check if the response is actually JSON before parsing
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received HTML instead of JSON. Check API_URL.");
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks. Check console.");
    }
  };

  const addTask = (newTask) => setTasks([...tasks, newTask]);

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Error deleting task');
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
      const res = await fetch(`${API_BASE}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update');

      const updated = await res.json();
      setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
      toast.info(`Task marked as ${newStatus}`);
    } catch (err) {
      toast.error('Error updating task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Tracker</h1>
        <TaskForm onTaskAdded={addTask} API_BASE={API_BASE} />
        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleStatus} />
      </div>
      
      {/* This component displays the notifications */}
      <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
    </div>
  );
};

export default App;