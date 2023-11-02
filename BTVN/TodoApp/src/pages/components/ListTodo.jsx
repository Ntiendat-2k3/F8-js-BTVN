import React from "react";
import Client from "../../helpers/Client";

export default function ListTodo({ todos, setTodos, apiKey }) {
     const deleteTask = async (_id) => {
          const client = new Client();
          try {
               const response = await client.delete(`/todos/${_id}`, {}, apiKey);
               if (response.data && response.data.success) {
                    setTodos(todos.filter((todo) => todo._id !== _id));
               }
          } catch (error) {
               console.error("Error deleting todo:", error);
          }
     };

     const toggleEditing = (_id) => {
          setTodos(
               todos.map((todo) =>
                    todo._id === _id ? { ...todo, isEditing: !todo.isEditing } : todo
               )
          );
     };

     const updateTodoValue = (_id, newValue) => {
          setTodos(todos.map((todo) => (todo._id === _id ? { ...todo, todo: newValue } : todo)));
     };

     const updateTask = async (_id, todoValue) => {
          const client = new Client();
          try {
               const response = await client.put(`/todos/${_id}`, { todo: todoValue }, {}, apiKey);
               if (response.data && response.data.success) {
                    setTodos(
                         todos.map((todo) =>
                              todo._id === _id
                                   ? { ...todo, todo: todoValue, isEditing: false }
                                   : todo
                         )
                    );
               }
          } catch (error) {
               console.error("Error updating todo:", error);
          }
     };

     const handleInputChange = (e, _id) => {
          const newValue = e.target.value;
          updateTodoValue(_id, newValue);
     };

     return (
          <>
               {todos.map(({ todo, _id, isEditing }) => (
                    <div key={_id}>
                         <input
                              readOnly={!isEditing}
                              value={todo}
                              onChange={(e) => handleInputChange(e, _id)}
                         />
                         <button onClick={() => toggleEditing(_id)}>
                              {isEditing ? "Save" : "Edit"}
                         </button>
                         <button onClick={() => deleteTask(_id)}>Delete</button>
                    </div>
               ))}
          </>
     );
}
