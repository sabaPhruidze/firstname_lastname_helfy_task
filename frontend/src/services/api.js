const BASE_URL = "http://localhost:4000/api/tasks";

export const getTasks = async () => {
  const response = await fetch(BASE_URL);
  const data = response.json();
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
