import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, updateTodo } from "../services/api";
import { useForm } from "react-hook-form";
import { ThemeContext } from "../context/ThemeContext";

export default function TaskModal({ task, closeModal, isLightColor }) {
  const queryClient = useQueryClient();
  const { themeColor } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: task || { title: "", description: "", dueDate: "" },
  });

  const mutation = useMutation({
    mutationFn: (data) => (task ? updateTodo(task.id, data) : addTodo(data)),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      closeModal();
      reset();
    },
    onError: (error) => console.error("Mutation error:", error),
  });

  const onSubmit = (data) => {
    const today = new Date().toISOString().split("T")[0];

    if (!data.title.trim()) {
      setError("title", { message: "Title is required" });
      return;
    }
    if (!data.description.trim()) {
      setError("description", { message: "Description is required" });
      return;
    }
    if (!data.dueDate) {
      setError("dueDate", { message: "Due date is required" });
      return;
    }
    if (data.dueDate < today) {
      setError("dueDate", { message: "Due date cannot be in the past" });
      return;
    }

    mutation.mutate(data);
  };

  const lightTheme = isLightColor(themeColor);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(74,71,71,0.65)] bg-opacity-10"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Title Input */}
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="w-full p-2 border rounded-md"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          {/* Description Input */}
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="w-full p-2 border rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          {/* Due Date Input */}
          <input
            type="date"
            {...register("dueDate", {
              required: "Due date is required",
              validate: (value) =>
                value >= new Date().toISOString().split("T")[0] ||
                "Due date cannot be in the past",
            })}
            className="w-full p-2 border rounded-md"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
          )}

          {/* Buttons */}
          <button
            type="submit"
            style={{
              backgroundColor: lightTheme ? "#d1d1d1" : themeColor,
              color: lightTheme ? "#000" : "#FFF",
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {task ? "Update Task" : "Add Task"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="ml-3 text-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
