// client/src/components/TodoItem.js
import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo._id)}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        tabIndex={-1}
        disableRipple
        onClick={() => onToggle(todo._id)}
      />
      <ListItemText 
        primary={todo.text} 
        sx={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'text.secondary' : 'text.primary' }} 
      />
    </ListItem>
  );
}

export default TodoItem;