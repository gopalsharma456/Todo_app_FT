import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../services/api";

export default function TodoItem({ task, openModal }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(task.id),
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: () => updateTodo(task.id, { completed: !task.completed }),
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  return (
    <li className="flex justify-between items-center p-3 bg-white shadow-md rounded-md">
      <div className="flex items-center space-x-3">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleCompleteMutation.mutate()} 
          className="w-5 h-5"
        />
        <span className={`${task.completed ? "line-through text-gray-500" : ""}`}>
          {task.title}
        </span>
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={() => openModal(task)} 
          className="bg-yellow-500 text-white px-3 py-1 rounded-md"
        >
          Edit
        </button>
        <button 
          onClick={() => deleteMutation.mutate()} 
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
