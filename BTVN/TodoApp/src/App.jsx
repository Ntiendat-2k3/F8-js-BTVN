import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import getApiKey from "./helpers/getApiKey";
import { emailRegex } from "./helpers/email-regex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
     const [apiKey, setApiKey] = useState("");

     useEffect(() => {
          const storedApiKey = localStorage.getItem("apiKey");

          if (storedApiKey) {
               setApiKey(storedApiKey);
          } else {
               const getUsernameFromEmail = (email) => {
                    return email.split("@")[0];
               };

               const promptEmailAndFetchApiKey = async () => {
                    const email = window.prompt("Vui lòng nhập email!", "example@gmail.com");
                    if (email && emailRegex(email)) {
                         const fetchedApiKey = await getApiKey(email);
                         setApiKey(fetchedApiKey);

                         const username = getUsernameFromEmail(email);
                         toast.success(`Chào mừng bạn ${username} đã quay trở lại`, {
                              position: "top-right",
                              autoClose: 3000,
                         });
                         toast.error("Reload lần đầu để lấy tasks", {
                              position: "top-right",
                              autoClose: 3000,
                         });
                    } else {
                         window.alert("Email không hợp lệ");
                         window.location.reload();
                    }
               };

               promptEmailAndFetchApiKey();
          }
     }, []);

     return (
          <>
               <ToastContainer />
               <Home apiKey={apiKey} />
          </>
     );
}

export default App;
