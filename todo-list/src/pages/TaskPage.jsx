import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';
import { Box } from '@mui/material';
import { createTask, getTasks, updateTask, deleteTask } from '../services/taskService';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = () => {
    getTasks().then(taskList => {
      setTasks(taskList);
    });
  }

  useEffect(() => {
    refreshTasks();
  }, [])

  return (
    <Box>
      <TaskForm
        onSubmit={(task) => { createTask(task).then(() => refreshTasks()) }}
      />
      <TaskList
        tasks={tasks}
        onEdit={(task) => { updateTask(task).then(() => refreshTasks()) }}
        onDelete={(id) => { deleteTask(id).then(() => refreshTasks()) }}
      />
    </Box>
  );
};

export default TaskPage;
