import React, { useState, useContext } from "react";
import TodoList from "./components/TodoList";
import TaskModal from "./components/TaskModal";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ThemeProvider, { ThemeContext } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function MainApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const { themeColor } = useContext(ThemeContext);

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    document.body.style.overflow = "unset";
  };

  const isLightColor = (hexColor) => {
    if (!hexColor) return false;
    const rgb = parseInt(hexColor.substring(1), 16); // Convert HEX to integer
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return r * 0.299 + g * 0.587 + b * 0.114 > 200; // Increased threshold for better contrast
  };

  const lightTheme = isLightColor(themeColor);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 text-gray-900 dark:text-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">To Do List</h1>
      <ThemeSwitcher />

      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => openModal(null)}
          style={{
            backgroundColor: lightTheme ? "#d1d1d1" : themeColor,
            color: lightTheme ? "#000" : "#FFF",
          }}
          className="btn-primary bg-green-500 text-white px-4 py-2 rounded-md"
        >
          + Add Task
        </button>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
          style={{
            backgroundColor: lightTheme ? "#d1d1d1" : themeColor,
            color: lightTheme ? "#000" : "#FFF",
          }}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <TodoList openModal={openModal} filter={filter} />
      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          closeModal={closeModal}
          isLightColor={isLightColor}
        />
      )}
    </div>
  );
}
