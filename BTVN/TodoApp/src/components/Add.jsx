import React, { useState } from "react";
import { Client } from "../api/client";
import useAlertify from "../hooks/useAlertify";
import Cookie from "js-cookie";
import SearchBox from "./SearchBox";

export default function Add({ handleLoading, handleIsRender }) {
     const [form, setForm] = useState({ todo: "" });
     const { error, notify } = useAlertify();

     const addLoading = (btn) => {
          btn.disabled = true;
          handleLoading(true);
     };

     const removeLoading = (btn) => {
          btn.disabled = false;
          handleLoading(false);
     };

     const postWork = async (data = {}) => {
          const { response, data: work } = await Client.post(`/todos`, data);

          if (response.status === 401) {
               Cookie.remove("apiKey");
               Cookie.remove("userEmail");
               error("Vui lòng đăng nhập!");
               setTimeout(() => {
                    window.location.reload();
               }, 2000);
          } else if (response.ok) {
               return work;
          } else {
               return null;
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const value = form.todo;
          if (value.length > 3) {
               const submitButton = e.target.querySelector('button[type="submit"]');
               addLoading(submitButton);
               const work = await postWork({ todo: value });
               removeLoading(submitButton);
               if (work) {
                    notify(
                         `Thêm todo thành công! ❤️ <br><span style="font-size: 12px;">Click để ẩn</span>`,
                         "ajs-add",
                         5
                    );
                    setForm({ todo: "" });
                    handleIsRender(true);
               } else if (work === null) {
                    error(`Đã xảy ra lỗi, hãy thử lại!`);
               }
          } else {
               error("Vui lòng nhập dài hơn 5 ký tự!");
          }
     };

     const handleChangeValue = (e) => {
          setForm((currentForm) => ({ ...currentForm, [e.target.name]: e.target.value }));
     };

     return (
          <form className="todo-AddForm" onSubmit={handleSubmit}>
               <div className="input-box">
                    <input
                         type="text"
                         name="todo"
                         placeholder="New task"
                         autoComplete="off"
                         onChange={handleChangeValue}
                         value={form.todo}
                    />
               </div>
               <button type="submit">Add task</button>
          </form>
     );
}
