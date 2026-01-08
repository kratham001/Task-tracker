import React, { useState } from 'react';

const TaskForm = ({ onTaskAdded, API_BASE }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  });

  const isValid = formData.title.trim() && formData.dueDate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    onTaskAdded(data);
    setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <input
            type="text"
            placeholder="Task Title (Required)"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <input
          type="date"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
        <select
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <textarea
          placeholder="Description (Optional)"
          className="col-span-1 md:col-span-2 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <button
        disabled={!isValid}
        className={`w-full mt-4 px-6 py-2 text-white rounded font-bold transition ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;