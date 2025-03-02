"use client";

import { FC, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo, updateTodo } from '@/lib/services/api';
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

interface TodoFormDialogProps {
  open: boolean;
  onClose: () => void;
  todo?: Todo | null;
}

const TodoFormDialog: FC<TodoFormDialogProps> = ({ open, onClose, todo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: todo ? updateTodo : createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      mutation.mutate({ ...todo, title, description, completed });
    } else {
      mutation.mutate({ title, description, completed: false });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{todo ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
      <DialogContent >
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