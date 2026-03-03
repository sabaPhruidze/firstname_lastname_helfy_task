const BASE_URL = "http://localhost:4000/api/tasks";

export const getTasks = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error , can not fetcch tasks");
  }
  return data;
};
export const postTask = async (body) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error, can not upload tasks try again");
  }
  return data;
};
export const putTask = async (id, body) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error, can not update the task");
  }
  return data;
};
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error, can not delete task");
  }
  return data;
};
export const patchTask = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}/toggle`, {
    method: "PATCH",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error, can not update the task");
  }
  return data;
};
