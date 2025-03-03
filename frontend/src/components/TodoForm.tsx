"use client";

import { FC, useState, useEffect, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo, updateTodo, deleteTodo } from '@/lib/services/api'; // Add deleteTodo
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Todo } from '@/types/general';
import { useSnackbar } from '@/hooks/useSnackbar';

interface TodoFormDialogProps {
  open: boolean;
  onClose: () => void;
  todo?: Todo | null;
}

/**
 * TodoFormDialog Component
 * 
 * This component renders a dialog for adding, editing, or deleting a TODO item.
 * 
 * @param open - A boolean to control the visibility of the dialog.
 * @param onClose - A callback function to close the dialog.
 * @param todo - An optional TODO item to edit or delete. If not provided, the form will create a new TODO.
 * @returns A dialog form for adding, editing, or deleting a TODO item.
 */
const TodoFormDialog: FC<TodoFormDialogProps> = ({ open, onClose, todo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  // Reset form when the dialog opens or the todo changes
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [todo, open]);

  // Mutation for creating or updating a TODO
  const mutation = useMutation({
    mutationFn: todo ? updateTodo : createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showSnackbar(
        `Todo ${todo ? 'updated' : 'added'} successfully!`,
        'success'
      );
      onClose();
    },
    onError: () => {
      showSnackbar('Something went wrong. Please try again.', 'error');
    },
  });

  // Mutation for deleting a TODO
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showSnackbar('Todo deleted successfully!', 'success');
      onClose();
    },
    onError: () => {
      showSnackbar('Failed to delete the todo. Please try again.', 'error');
    },
  });

  // Handle form submission for save/update
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (todo) {
      mutation.mutate({ ...todo, title, description, completed });
    } else {
      mutation.mutate({ title, description, completed: false });
    }
  };

  // Handle delete action
  const handleDelete = () => {
    if (todo) {
      deleteMutation.mutate(Number(todo.id));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{todo ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          {todo && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  color="primary"
                />
              }
              label="Completed"
            />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {todo && (
          <Button
            variant="contained"
            color="error"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={mutation.isPending}
          onClick={handleSubmit}
        >
          {mutation.isPending ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoFormDialog;