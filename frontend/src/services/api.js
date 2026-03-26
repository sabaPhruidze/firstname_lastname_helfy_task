const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/tasks";

const request = async (url, options = {}, fallbackMessage) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
};

export const getTasks = async () =>
  request(BASE_URL, {}, "Could not fetch tasks.");

export const postTask = async (body) =>
  request(
    BASE_URL,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    "Could not create task.",
  );

export const putTask = async (id, body) =>
  request(
    `${BASE_URL}/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    "Could not update task.",
  );

export const deleteTask = async (id) =>
  request(
    `${BASE_URL}/${id}`,
    { method: "DELETE" },
    "Could not delete task.",
  );

export const patchTask = async (id) =>
  request(
    `${BASE_URL}/${id}/toggle`,
    { method: "PATCH" },
    "Could not update task status.",
  );
