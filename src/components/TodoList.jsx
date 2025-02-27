import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../services/api";
import TodoItem from "./TodoItem";

export default function TodoList({ todo, openModal, deleteTodo, filter }) {
  const { data: todos = [], isLoading, isError } = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });

  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks.</p>;

  return (
    <div className="p-5">
      {filteredTodos.length > 0 ? (
        <ul className="space-y-3">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} task={todo} openModal={openModal} deleteTodo={deleteTodo} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}
    </div>
  );
}
