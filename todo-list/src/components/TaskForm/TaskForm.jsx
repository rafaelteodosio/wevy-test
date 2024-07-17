import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') {
      setError('A Tarefa não pode estar vazia');
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
          label="Tarefa"
          fullWidth
          margin="normal"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Adicionar Tarefa
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;