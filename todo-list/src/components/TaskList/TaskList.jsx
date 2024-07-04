import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const TaskList = ({ tasks, onEdit, onDelete }) => {
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
              <TableCell>{task}</TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box>
                    <IconButton data-testid="editBtn" onClick={() => onEdit(index)}>
                      <Edit />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton data-testid="deleteBtn" onClick={() => onDelete(index)}>
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