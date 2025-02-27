import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThemeContext } from "../context/ThemeContext";
import { deleteTodo, updateTodo } from "../services/api";
import dayjs from "dayjs"; 

const isLightColor = (hexColor) => {
  if (!hexColor) return false;
  const rgb = parseInt(hexColor.substring(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return (r * 0.299 + g * 0.587 + b * 0.114) > 200;
};

const getDueStatus = (dueDate) => {
  if (!dueDate) return null;
  const today = dayjs().startOf("day");
  const dueDay = dayjs(dueDate).startOf("day");

  if (dueDay.isSame(today, "day")) return "today"; 
  if (dueDay.isBefore(today, "day")) return "overdue"; 

  return "upcoming";
};

export default function TodoItem({ task, openModal }) {
  const queryClient = useQueryClient();
  const { themeColor } = useContext(ThemeContext);

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(task.id),
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: () => updateTodo(task.id, { completed: !task.completed }),
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const lightTheme = isLightColor(themeColor);
  const dueStatus = getDueStatus(task.dueDate);

  return (
    <li className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 shadow-md rounded-md">
      <div className="flex flex-col space-y-1">
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

        {/* Due Date & Overdue Warning */}
        {task.dueDate && (
          <div className="flex items-center space-x-2">
            <span
              className={`text-sm font-medium ${
                dueStatus === "today" ? "text-red-500" : 
                dueStatus === "overdue" ? "text-red-700 font-bold" : 
                "text-green-700"
              }`}
            >
              Due: {dayjs(task.dueDate).format("DD MMM, YYYY")}
            </span>

            {dueStatus === "overdue" && (
              <span className="text-xs text-red-700 font-semibold bg-red-200 px-2 py-1 rounded-md">
                ⚠️ Overdue
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {/* Edit Button - Outlined */}
        <button
          onClick={() => openModal(task)}
          className="px-3 py-1 rounded-md border-2 transition-all hover:bg-opacity-20"
          style={{
            borderColor: lightTheme ? "#333" : themeColor,
            color: lightTheme ? "#333" : themeColor,
            backgroundColor: lightTheme ? "#f3f3f3" : `${themeColor}20`,
          }}
        >
          Edit
        </button>

        {/* Delete Button - Filled */}
        <button
          onClick={() => deleteMutation.mutate()}
          className="px-3 py-1 rounded-md"
          style={{
            backgroundColor: lightTheme ? "#d1d1d1" : themeColor,
            color: lightTheme ? "#000" : "#FFF",
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
