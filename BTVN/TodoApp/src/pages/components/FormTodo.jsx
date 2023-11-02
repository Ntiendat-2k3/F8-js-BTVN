import React, { useState } from "react";
import "../../assets/container.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListTodo from "./ListTodo";
import Client from "../../helpers/Client";
import Loading from "../../Loading/loading";
import getApiKey from "../../helpers/getApiKey";
import { emailRegex } from "../../helpers/email-regex";

export default function FormTodo({ setTodos, todos, apiKey }) {
     const [isLoading, setIsLoading] = useState(false);

     const getUsernameFromEmail = (email) => {
          const username = email.split("@")[0];
          return username;
     };

     const fetchTodos = async () => {
          if (apiKey) {
               const client = new Client();
               try {
                    setIsLoading(true);
                    const response = await client.get("/todos", {}, apiKey);
                    if (response.data && response.data.data) {
                         setTodos(response.data.data.listTodo);
                    }
                    setIsLoading(false);
               } catch (error) {
                    console.error("Error fetching todos:", error);
                    setIsLoading(false);
               }
          }
     };

     const checkNeedLogin = () => {
          if (!localStorage.getItem("apiKey")) {
               handleLogin();
          } else {
               fetchTodos();
          }
     };

     const handleLogin = async () => {
          const email = window.prompt("Vui lòng nhập email của bạn:", "");
          if (email && emailRegex(email)) {
               const fetchedApiKey = await getApiKey(email);
               const username = getUsernameFromEmail(email);
               toast.success(`Chào mừng ${username}`, {
                    position: "top-right",
                    autoClose: 3000,
               });
               localStorage.setItem("apiKey", fetchedApiKey);
               fetchTodos();
          } else {
               toast.error("Email không hợp lệ!", {
                    position: "top-right",
                    autoClose: 3000,
               });
          }
     };

     return (
          <>
               <ToastContainer />
               {isLoading ? (
                    <Loading />
               ) : (
                    <>
                         <ListTodo todos={todos} setTodos={setTodos} />
                    </>
               )}
          </>
     );
}
