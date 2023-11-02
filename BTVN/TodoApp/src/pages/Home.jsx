import React, { useState, useEffect } from "react";
import FormTodo from "./components/FormTodo";
import ListTodo from "./components/ListTodo";
import Client from "../helpers/Client";

const Home = ({ apiKey }) => {
     const [todos, setTodos] = useState([]);

     useEffect(() => {
          const fetchTodos = async () => {
               if (apiKey) {
                    const client = new Client();
                    try {
                         const response = await client.get("/todos", {}, apiKey);
                         if (response.data && response.data.data) {
                              setTodos(response.data.data.listTodo);
                         }
                    } catch (error) {
                         console.error("Error fetching todos:", error);
                    }
               }
          };

          fetchTodos();
     }, [apiKey]);

     return (
          <>
               <FormTodo setTodos={setTodos} todos={todos} apiKey={apiKey} />
               <ListTodo todos={todos} setTodos={setTodos} apiKey={apiKey} />
          </>
     );
};

export default Home;
