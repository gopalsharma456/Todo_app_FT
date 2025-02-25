let BASE_URL=import.meta.env.VITE_BASE_URL

export const fetchTodos = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const addTodo = async (todo) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const updateTodo = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
