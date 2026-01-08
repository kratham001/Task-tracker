import React, { useState } from 'react';

const TaskList = ({ tasks, onDelete, onToggle }) => {
  const [stackBy, setStackBy] = useState('date'); 

  const groupTasks = () => {
    if (stackBy === 'date') return { 'All Tasks': tasks };

    return tasks.reduce((groups, task) => {
      const key = stackBy === 'priority' ? task.priority : task.status;
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
      return groups;
    }, {});
  };

  const groupedTasks = groupTasks();
  const groupKeys = Object.keys(groupedTasks).sort();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Your Tasks</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setStackBy('date')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${stackBy === 'date' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'}`}
          >
            Date
          </button>
          <button 
            onClick={() => setStackBy('status')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${stackBy === 'status' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'}`}
          >
            Status
          </button>
          <button 
            onClick={() => setStackBy('priority')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${stackBy === 'priority' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'}`}
          >
            Priority
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {groupKeys.map((group) => (
          <div key={group} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-md font-bold text-gray-800 mb-3 pb-2 border-b uppercase tracking-wide text-xs">
              {group} <span className="text-gray-400 font-normal ml-1">({groupedTasks[group].length})</span>
            </h3>
            
            <div className="grid gap-3">
              {groupedTasks[group].length === 0 && <p className="text-gray-400 text-sm text-center py-2">No tasks here.</p>}
              {groupedTasks[group].map((task) => (
                <div key={task._id} className={`p-3 border rounded flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition ${task.status === 'Completed' ? 'opacity-60 bg-gray-50' : 'bg-white'}`}>
                  <div className="mb-2 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-semibold text-gray-800 ${task.status === 'Completed' ? 'line-through' : ''}`}>
                        {task.title}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
                    <p className="text-xs text-gray-400 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => onToggle(task)}
                      className={`flex-1 sm:flex-none text-xs px-3 py-1.5 rounded font-medium transition ${
                        task.status === 'Completed' 
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {task.status === 'Completed' ? 'Undo' : 'Complete'}
                    </button>
                    <button 
                      onClick={() => onDelete(task._id)}
                      className="flex-1 sm:flex-none text-xs px-3 py-1.5 bg-red-100 text-red-700 rounded font-medium hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;