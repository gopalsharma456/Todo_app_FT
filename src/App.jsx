import React, { useState } from "react";
import TodoList from "./components/TodoList";
import TaskModal from "./components/TaskModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-2xl mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">To Do List</h1>
        <button 
          onClick={() => openModal(null)} 
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-3 w-full"
        >
          Add Task
        </button>
        <TodoList openModal={openModal} />
        {isModalOpen && <TaskModal task={selectedTask} closeModal={closeModal} />}
      </div>
    </QueryClientProvider>
  );
}
