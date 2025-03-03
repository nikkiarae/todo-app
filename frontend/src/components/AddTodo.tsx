"use client";

import { FC, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TodoFormDialog from './TodoForm';

/**
 * AddTodoButton Component
 * 
 * This component renders a button that opens a dialog for adding a new TODO item.
 * @returns A button to open the TODO form dialog and the associated dialog component.
 */
const AddTodoButton: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
        <IconButton color="inherit" onClick={() => setOpen(true)}>
            <AddIcon />
        </IconButton>      
        <TodoFormDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default AddTodoButton;