import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <ListItemText primary={task} />
          <IconButton onClick={() => onEdit(index)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => onDelete(index)}>
            <Delete />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
