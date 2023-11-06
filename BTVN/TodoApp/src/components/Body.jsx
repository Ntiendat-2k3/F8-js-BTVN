import React, { useState, useEffect } from "react";
import Add from "./Add";
import TodoList from "./TodoList";
import Login from "./Login";
import Cookie from "js-cookie";
import useAlertify from "../hooks/useAlertify";
import { Client } from "../api/Client";
import SearchBox from "./SearchBox";

export default function Body({ handleLoading }) {
     const [isLogin, setIsLogin] = useState(
          Cookie.get("apiKey") && Cookie.get("userEmail") ? true : false
     );
     const [isRender, setIsRender] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
     const { success, error } = useAlertify();

     const handleLogin = (boolean) => {
          setIsLogin(boolean);
     };

     const handleIsRender = (boolean) => {
          setIsRender(boolean);
     };

     const handleSearch = (term) => {
          setSearchTerm(term);
     };

     // useEffect(() => {
     //      if (isRender || searchTerm) {
     //           // handleRender();
     //           handleIsRender(false);
     //      }
     // }, [isRender, handleIsRender, searchTerm]);

     useEffect(() => {
          const apiKeyCookie = Cookie.get("apiKey") || "";
          const usersEmailCookie = Cookie.get("userEmail") || "";

          if (apiKeyCookie) {
               Client.setApiKey(apiKeyCookie);
          }

          if (apiKeyCookie && usersEmailCookie) {
               success(
                    `Chào bạn ${usersEmailCookie.split("@")[0]}.<br> Chúc bạn trải nghiệm vui vẻ <3`
               );
          } else {
               error("Đăng nhập đi nè !");
          }
     }, [isLogin]); // Chỉ chạy khi isLogin thay đổi

     return (
          <>
               {!isLogin && <Login handleLogin={handleLogin}></Login>}
               <div className="todo">
                    <div className="containers">
                         <h1 className="todo-title">Welcome to Todo App!</h1>
                         <SearchBox onSearch={handleSearch}></SearchBox>
                         <Add handleLoading={handleLoading} handleIsRender={handleIsRender}></Add>
                         {isLogin ? (
                              <TodoList
                                   isLogin={isLogin}
                                   handleLoading={handleLoading}
                                   isRender={isRender}
                                   handleIsRender={handleIsRender}
                                   searchTerm={searchTerm}></TodoList>
                         ) : (
                              <ul className="todo-list">
                                   <li className="todo-work">
                                        <div className="input-box">
                                             <input
                                                  type="text"
                                                  value="Đăng nhập để sử dụng"
                                                  readOnly
                                             />
                                        </div>
                                   </li>
                              </ul>
                         )}
                    </div>
               </div>
          </>
     );
}
