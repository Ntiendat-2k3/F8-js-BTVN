const apiUrl = "https://cvsy7f-8080.csb.app/todos";

const fetchData = async (url, options = {}) => {
     const response = await fetch(url, options);
     if (!response.ok) {
          throw new Error(`Failed to fetch URL ${url} with status ${response.status}`);
     }
     return await response.json();
};

export const getTasks = () => fetchData(apiUrl);

export const postTasks = (task) =>
     fetchData(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
     });

export const editTasks = (id, name, done) =>
     fetchData(`${apiUrl}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, done }),
     });

export const deleteTasks = (id) => fetchData(`${apiUrl}/${id}`, { method: "DELETE" });

export const getTaskDetails = (taskId) =>
     fetchData(`${apiUrl}/${taskId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
     });
