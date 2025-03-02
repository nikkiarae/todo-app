"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Todo } from "@/types/general";

interface TodoCardProps {
  todo: Todo;
  onClick: (todo: Todo) => void;
}

const TodoCard: FC<TodoCardProps> = ({ todo, onClick }) => {
  return (
      <Card
        sx={{ cursor: "pointer", height: "100%" }}
        onClick={() => onClick(todo)}
      >
        <CardContent>
            <Stack spacing={2}>
                <Typography variant="h6" component="div">
                    {todo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {todo.description}
                </Typography>
                <Typography
                    variant="body2"
                    color={todo.completed ? "success.main" : "error.main"}
                >
                    {todo.completed ? "Completed" : "Pending"}
                </Typography>
            </Stack>
        </CardContent>
      </Card>
  );
};

export default TodoCard;
