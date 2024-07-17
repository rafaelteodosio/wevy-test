import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Box, TextField } from '@mui/material';
import { Delete, Edit, Check } from '@mui/icons-material';

const TaskList = ({ tasks, onEdit, onDelete }) => {

  const [taskEdit, setTaskEdit] = useState(null);
  const [error, setError] = useState('');

  const handleError = (task) => {
    if (task === '') {
      setError('A Tarefa não pode estar vazia');
      return 1;
    }
    setError('');
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tarefas</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell>{taskEdit?.id === task?.id ?
                <TextField
                  data-testid="editField"
                  value={taskEdit?.title}
                  error={!!error}
                  helperText={error}
                  onChange={(e) => {
                    setTaskEdit(prev => ({ ...prev, title: e.target.value }));
                  }}
                /> : task?.title}
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box>
                    <IconButton>
                      {taskEdit?.id === task?.id ?
                        <Check
                          data-testid="checkBtn"
                          onClick={() => {
                            const hasError = handleError(taskEdit?.title);
                            if (!hasError) {
                              onEdit(taskEdit);
                              setTaskEdit(null);
                              setError('');
                            }
                          }} />
                        :
                        <Edit
                          data-testid="editBtn"
                          onClick={() => {
                            setTaskEdit(task)
                            setError('');
                          }}
                        />
                      }
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton data-testid="deleteBtn" onClick={() => {
                      setTaskEdit(null);
                      onDelete(task?.id);
                    }}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;