import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Box, TextField } from '@mui/material';
import { Delete, Edit, Check } from '@mui/icons-material';

const TaskList = ({ tasks, onEdit, onDelete }) => {

  const [taskEdit, setTaskEdit] = useState(null);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell>{taskEdit?.id === task?.id ?
                <TextField
                  value={taskEdit?.title}
                  onChange={(e) => setTaskEdit(prev => ({ ...prev, title: e.target.value }))}
                /> : task?.title}
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box>
                    <IconButton data-testid="editBtn">
                      {taskEdit?.id === task?.id ?
                        <Check onClick={() => {
                          onEdit(taskEdit);
                          setTaskEdit(null);
                        }} />
                        :
                        <Edit onClick={() => setTaskEdit(task)} />}
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