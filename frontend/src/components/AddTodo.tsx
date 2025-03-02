"use client";

import { FC, useState } from 'react';
import { Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TodoFormDialog from './TodoForm';

const AddTodoButton: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
        <IconButton color="inherit" onClick={() => setOpen(true)}>
            <AddIcon />
        </IconButton>      
        <TodoFormDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AddTodoButton;