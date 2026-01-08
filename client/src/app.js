import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_BASE = process.env.REACT_APP_API_URL

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = (newTask) => setTasks([...tasks, newTask]);

  const deleteTask = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    const res = await fetch(`${API_BASE}/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Tracker</h1>
        <TaskForm onTaskAdded={addTask} API_BASE={API_BASE} />
        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleStatus} />
      </div>
    </div>
  );
};

export default App;