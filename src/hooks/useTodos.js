import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

// Fetch To-Dos
export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    },
  });
};

// Add To-Do
export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodo) => {
      const { data } = await axios.post(API_URL, newTodo);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

// Delete To-Do
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
