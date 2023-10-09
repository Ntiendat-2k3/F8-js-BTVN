import { apiUrl } from "./config.js";

export const fetchAPI = async (url, options = {}) => {
     const response = await fetch(url, options);
     return response.json();
};

export const getTodo = () => fetchAPI(apiUrl);
export const postTodo = (data) =>
     fetchAPI(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
     });
export const deleteTodo = (id) => fetchAPI(`${apiUrl}/${id}`, { method: "DELETE" });
export const updateTodo = (id, data) =>
     fetchAPI(`${apiUrl}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
     });
