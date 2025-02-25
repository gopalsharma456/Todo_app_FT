import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../services/api";
import TodoItem from "./TodoItem";

export default function TodoList({ openModal }) {
  const { data: todos = [], isLoading, isError } = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks.</p>;

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} task={todo} openModal={openModal} />
      ))}
    </ul>
  );
}
