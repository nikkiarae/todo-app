"use client";

import { FC } from 'react';
import { Container } from '@mui/material';
import TodoList from '@/components/TodoList';

const Home: FC = () => {
  return (
    <Container>
      <TodoList />
    </Container>
  );
};

export default Home;