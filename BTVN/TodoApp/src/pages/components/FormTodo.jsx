import React, { useState, useEffect } from "react";
import "../../assets/container.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListTodo from "./ListTodo";
import Client from "../../helpers/httpClient";
import Loading from "../../Loading/loading";
import getApiKey from "../../helpers/getApiKey";
import { emailRegex } from "../../helpers/matchEmail";

const client = new Client();

export default function FormTodo({ setTodos, todos }) {
     const [isLoading, setIsLoading] = useState(false);

     const getUsernameFromEmail = (email) => email.split("@")[0];

     const fetchTodos = async () => {
          setIsLoading(true);
          try {
               const apiKey = localStorage.getItem("apiKey");
               const { data } = await client.get("/todos", {}, apiKey);
               setTodos(data.data.listTodo);
          } catch (error) {
               toast.error("Có lỗi xảy ra khi lấy todos", {
                    position: "top-right",
                    autoClose: 3000,
               });
          } finally {
               setIsLoading(false);
          }
     };

     useEffect(() => {
          const needLogin = localStorage.getItem("needLogin") === "true";
          if (needLogin) {
               localStorage.removeItem("needLogin");
               handleLogin();
          } else {
               fetchTodos();
          }
     }, []);

     const handleLogin = async () => {
          const email = window.prompt("Vui lòng nhập email!", "example@gmail.com");
          if (email && emailRegex.test(email)) {
               try {
                    const newApiKey = await getApiKey(email);
                    localStorage.setItem("apiKey", newApiKey);
                    localStorage.setItem("email", email);
                    const username = getUsernameFromEmail(email);
                    toast.success(`Chào mừng ${username} đã quay trở lại`, {
                         position: "top-right",
                         autoClose: 3000,
                    });
                    fetchTodos();
               } catch (error) {
                    toast.error("Có lỗi xảy ra khi lấy API key", {
                         position: "top-right",
                         autoClose: 3000,
                    });
               }
          } else {
               toast.error("Email không hợp lệ", {
                    position: "top-right",
                    autoClose: 3000,
               });
          }
     };


     const handleSubmit = async (e) => {
          e.preventDefault();
          const todo = e.target.todo.value.trim();
          if (todo) {
               try {
                    setIsLoading(true);
                    const apiKey = localStorage.getItem("apiKey");
                    const { data } = await client.post("/todos", { todo }, {}, apiKey);
                    setTodos((prevTodos) => [data.data, ...prevTodos]);
                    e.target.todo.value = "";
                    toast.success("Thêm bài viết thành công", {
                         position: "top-right",
                         autoClose: 3000,
                    });
               } catch (error) {
                    handleApiError(error);
               } finally {
                    setIsLoading(false);
               }
          } else {
               toast.warn("Cần ít nhất 1 ký tự nhập vào!", {
                    position: "top-right",
                    autoClose: 3000,
               });
          }
     };

     const handleApiError = (error) => {
          if (error.message === "Unauthorize") {
               localStorage.setItem("needLogin", "true");
               toast.error("Có lỗi xảy ra, vui lòng reload lại!", {
                    position: "top-right",
                    autoClose: 5000,
               });
          } else {
               toast.error(error.message, {
                    position: "top-right",
                    autoClose: 3000,
               });
          }
     };

     return (
          <>
               {isLoading && <Loading />}
               <div className="container">
                    <h1>Welcome to Todo App!</h1>
                    <form onSubmit={handleSubmit} className="form">
                         <input
                              type="text"
                              placeholder="Write todo"
                              name="todo"
                              className="input-todo"
                         />
                         <button className="btn-submit">Add task</button>
                    </form>
                    <ToastContainer
                         position="top-right"
                         autoClose={5000}
                         hideProgressBar={false}
                         newestOnTop={false}
                         closeOnClick
                         rtl={false}
                         pauseOnFocusLoss
                         draggable
                         pauseOnHover
                         theme="dark"
                    />
                    <ListTodo
                         todos={todos}
                         deleteTask={deleteTask}
                         toggleEditing={toggleEditing}
                         updateTodoValue={updateTodoValue}
                         handleComplete={handleComplete}
                         updateTask={updateTask}
                    />
               </div>
          </>
     );
}
