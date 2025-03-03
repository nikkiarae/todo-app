"use client";

import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '@/lib/services/api';
import { Grid2 as Grid, Typography } from '@mui/material';
import TodoFormDialog from './TodoForm';
import TodoCard from './TodoCard';
import { Todo } from '@/types/general';

const TodoList: FC = () => {
  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const openDialog = (todo: Todo) => {
    setEditingTodo(todo);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching todos</Typography>;

  // Filter todos into completed and incomplete
  const completedTodos = todos?.filter((todo) => todo.completed) || [];
  const incompleteTodos = todos?.filter((todo) => !todo.completed) || [];

  return (
    <>
      {/* Incomplete Todos Section */}
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Incomplete Todos
      </Typography>
      <Grid container spacing={2}>
        {incompleteTodos.map((todo) => (
          <Grid key={todo.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TodoCard todo={todo} onClick={openDialog} />
          </Grid>
        ))}
      </Grid>

      {/* Completed Todos Section */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Completed Todos
      </Typography>
      <Grid container spacing={2}>
        {completedTodos.map((todo) => (
          <Grid key={todo.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TodoCard todo={todo} onClick={openDialog} />
          </Grid>
        ))}
      </Grid>

      {/* Todo Form Dialog */}
      <TodoFormDialog
        open={!!editingTodo}
        onClose={() => setEditingTodo(null)}
        todo={editingTodo}
      />
    </>
  );
};

export default TodoList;