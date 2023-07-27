import React, { useState, useEffect } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import './styles/app.css';

const defState = {
  description: '',
};

const initialTask = [
  {
    description: 'Buy milk',
    isEditing: false,
    status: '',
  },
  {
    description: 'Buy birthday present',
    isEditing: false,
    status: '',
  },
  {
    description: 'Go to yoga',
    isEditing: false,
    status: '',
  },
];

const App = () => {
  const [task, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : initialTask;
  });

  const [newTask, setNewTask] = useState(defState);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTasks) => ({
      ...prevTasks,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.description.trim() === '') {
      alert('Please enter a task description.');
    } else {
      setTasks((prevTasks) => [...prevTasks, { ...newTask, isEditing: false, status: '' }]);
      setNewTask(defState);
    }
  };

  const handleEditTask = (index, updatedDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, description: updatedDescription } : task
      )
    );
  };

  const handleToggleEdit = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const handleDelete = (index) => {
    setTasks((prevTasks) => prevTasks.filter((task, i) => i !== index));
  };

  const handleSelectChange = (event, index) => {
    const { value } = event.target;
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, status: value } : task
      )
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MyInput
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Description of task"
        />
        <MyButton type="submit">Add Task</MyButton>
      </form>

      <ul>
        {task.map((task, index) => (
          <li key={index}>
            {task.isEditing ? (
              <div>
                <input
                  type="text"
                  value={task.description}
                  onChange={(e) => handleEditTask(index, e.target.value)}
                  className="inputEdit"
                />
                <button className="saveBtn" onClick={() => handleToggleEdit(index)}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <div className="divTask">
                  {index + 1}. {task.description}{' '}
                </div>
                <select
                  value={task.status}
                  onChange={(e) => handleSelectChange(e, index)}
                  className={`custom-select ${
                    task.status === 'In progress'
                      ? 'in-progress'
                      : task.status === 'Complete'
                      ? 'complete'
                      : 'todo'
                  }`}
                >
                  <option value="">ToDo</option>
                  <option value="In progress">In progress</option>
                  <option value="Complete">Complete</option>
                </select>
                <button className="editBtn" onClick={() => handleToggleEdit(index)}>
                  Edit
                </button>
                <button className="deleteBtn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

