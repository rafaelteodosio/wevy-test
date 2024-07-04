import React, { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';

const TaskForm = ({ onSubmit, editingTask }) => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask !== null) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') {
      setError('A Task não pode estar vazia');
      return;
    }
    onSubmit(task);
    setTask('');
    setError('');
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task"
          fullWidth
          margin="normal"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {editingTask !== null ? 'Update Task' : 'Add Task'}
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;