import React, { useRef, useEffect } from "react";
import { Client } from "../api/Client";
import useAlertify from "../hooks/useAlertify";
import Cookie from "js-cookie";
import { HtmlScript } from "./HtmlScript";

export default function Login({ handleLogin }) {
     const emailRef = useRef(null);
     const { success, error } = useAlertify();

     const getEmail = async (query = {}) => {
          const queryString = new URLSearchParams(query).toString();
          const { response, data } = await Client.get(`/api-key?` + queryString);
          if (response.status >= 500) {
               error("Đã xảy ra lỗi, hãy tải lại trang hoặc quay lại sau!");
          } else if (response.ok) {
               return data.data;
          } else {
               return null;
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const value = HtmlScript(emailRef.current.value);
          if (value.length > 3) {
               const data = await getEmail({ email: value });
               if (data) {
                    Cookie.set("apiKey", data.apiKey);
                    Cookie.set("userEmail", value);
                    emailRef.current.value = "";
                    handleLogin(true);
                    Client.setApiKey(data.apiKey);
               } else {
                    error(`Email chưa được đăng ký!`);
               }
          } else {
               error("Vui lòng đăng nhập");
          }
     };

     const eventClick = (e) => {
          if (!e.target.classList.contains("popup")) {
               e.stopPropagation();
               const popupElement = e.target.closest(".popup");
               if (e.target.classList.contains("close")) {
                    popupElement.classList.remove("active");
               }
          } else {
               e.target.classList.remove("active");
          }
     };

     useEffect(() => {
          const usersEmailCookie = Cookie.get("userEmail") || "";
          if (usersEmailCookie) {
               success(
                    `Chào bạn ${usersEmailCookie.split("@")[0]}.<br> Chúc bạn trải nghiệm vui vẻ <3`
               );
          }
     }, []);

     return (
          <div className={`popup active`} onClick={eventClick}>
               <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-box">
                         <input
                              ref={emailRef}
                              type="email"
                              name="email"
                              placeholder="Email đã đăng ký học ở F8"
                         />
                    </div>
                    <div className="button-box">
                         <button className="close" type="button">
                              Close
                         </button>
                         <button className="save" type="submit">
                              Login
                         </button>
                    </div>
               </form>
          </div>
     );
}
