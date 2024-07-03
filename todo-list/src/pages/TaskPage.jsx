import React, { useState } from 'react';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';
import { Box } from '@mui/material';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = (task) => {
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((t, index) =>
        index === editingIndex ? task : t
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setEditingIndex(index);
  };

  return (
    <Box>
      <TaskForm onSubmit={addTask} editingTask={editingIndex !== null ? tasks[editingIndex] : null} />
      <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
    </Box>
  );
};

export default TaskPage;
