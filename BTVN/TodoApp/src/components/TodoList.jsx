import React, { useState, useEffect } from "react";
import { Client } from "../api/Client";
import useAlertify from "../hooks/useAlertify";
import Cookie from "js-cookie";
import { HtmlScript } from "./HtmlScript";

export default function TodoList({ isLogin, handleLoading, isRender, handleIsRender, searchTerm }) {
     const [data, setData] = useState([]);
     const [editingId, setEditingId] = useState(null);
     const [inputValue, setInputValue] = useState("");
     // const [isChecked, setIsChecked] = useState(false);
     const { error, confirm, notify } = useAlertify();

     const addLoading = (btn) => {
          if (btn) {
               btn.disabled = true;
          }
          handleLoading(true);
     };

     const removeLoading = (btn) => {
          if (btn) {
               btn.disabled = false;
          }
          handleLoading(false);
     };

     const reloadPage = () => {
          Cookie.remove("apiKey");
          Cookie.remove("userEmail");
          error("Đăng nhập lại để tiếp tục!");
          setTimeout(() => {
               window.location.reload();
          }, 1500);
     };

     const getData = async () => {
          const { response, data: work } = await Client.get("/todos");
          if (response.status === 401) {
               reloadPage();
          } else if (response.ok) {
               return work;
          } else {
               return null;
          }
     };

     const handleRender = async () => {
          if (isLogin) {
               const work = await getData();
               if (work) {
                    setData([...work.data.listTodo]);
               } else if (work === null) {
                    error("Lỗi không thể lấy được dữ liệu, chờ chút nhé!");
               }
          }
     };

     const handleInputChange = (id, e) => {
          setInputValue(e.target.value);
     };

     const handleChecked = (id) => {
          setData((prevData) =>
               prevData.map((item) =>
                    item._id === id ? { ...item, isCompleted: !item.isCompleted } : item
               )
          );
     };

     const handleEditClick = (id) => {
          setEditingId(id);
     };

     const handleCancelClick = () => {
          setEditingId(null);
     };

     const handleUpdateClick = async (id, e) => {
          addLoading(e.target);
          const { isCompleted, todo } = data.find((item) => item._id === id);
          const { response, data: responseData } = await Client.patch(`/todos/${id}`, {
               todo: todo,
               isCompleted: isCompleted,
          });
          if (response.status === 401) {
               reloadPage();
          } else if (response.ok) {
               notify(
                    `Cập nhật todo trạng thái thành công! ❤️<br><span style="font-size: 12px;">Click để ẩn</span>`,
                    "ajs-edit",
                    5
               );
               handleRender();
               handleCancelClick();
          } else {
               error("Đã xảy ra lỗi, hãy thử lại!");
          }
          removeLoading(e.target);
     };

     const handleDelete = async (id, e) => {
          confirm(
               "Bạn có chắc chắn muốn xóa không?",
               async () => {
                    addLoading(e.target);
                    const { response, data } = await Client.delete(`/todos/${id}`);
                    if (response.status === 401) {
                         reloadPage();
                    } else if (response.ok) {
                         notify(
                              `Xóa todo thành công! ❤️ <br> <span style="font-size: 12px;">Click để ẩn</span>`,
                              "ajs-delete",
                              5
                         );
                         handleRender();
                    } else {
                         error("Đã xảy ra lỗi, hãy thử lại!");
                    }
                    removeLoading(e.target);
               },
               function () {
                    error("Đã hủy!");
               }
          );
     };

     useEffect(() => {
          if (isRender || searchTerm) {
               const fetchData = async () => {
                    const work = await getData();
                    if (work) {
                         if (searchTerm) {
                              const filteredData = work.data.listTodo.filter((item) =>
                                   item.todo.toLowerCase().includes(searchTerm.toLowerCase())
                              );
                              setData(filteredData);
                         } else {
                              setData([...work.data.listTodo]);
                         }
                    } else if (work === null) {
                         error("Lỗi không thể lấy được dữ liệu, chờ chút nhé!");
                    }
               };
               fetchData();
               handleIsRender(false);
          }
     }, [isRender, handleIsRender, searchTerm]);

     useEffect(() => {
          addLoading();
          handleRender();
          removeLoading();
     }, []);

     const listItem = data.map(({ _id, todo, isCompleted }) => (
          <li className="todo-work" key={_id}>
               <div className="input-box">
                    {editingId === _id ? (
                         <input
                              type="text"
                              onChange={(e) => handleInputChange(_id, e)}
                              style={isCompleted ? { textDecoration: "line-through" } : {}}
                              defaultValue={HtmlScript(todo)}
                         />
                    ) : (
                         <input
                              type="text"
                              defaultValue={HtmlScript(todo)}
                              style={isCompleted ? { textDecoration: "line-through" } : {}}
                              readOnly
                         />
                    )}
               </div>
               <div className="button-box">
                    {editingId === _id ? (
                         <>
                              <div className="button-box__left">
                                   <input
                                        type="checkbox"
                                        id={_id}
                                        checked={isCompleted}
                                        onChange={() => handleChecked(_id)}
                                        hidden
                                   />
                                   <label htmlFor={_id}>Not Completed</label>
                              </div>
                              <div className="button-box__right">
                                   <button
                                        className="cannel-btn"
                                        type="button"
                                        onClick={handleCancelClick}>
                                        Back
                                   </button>
                                   <button
                                        className="update-btn"
                                        type="button"
                                        onClick={(e) => handleUpdateClick(_id, e)}>
                                        Update
                                   </button>
                                   <button
                                        className="delete-btn"
                                        type="button"
                                        onClick={(e) => handleDelete(_id, e)}>
                                        Delete
                                   </button>
                              </div>
                         </>
                    ) : (
                         <>
                              <button className="edit-btn" onClick={() => handleEditClick(_id)}>
                                   Edit
                              </button>

                              <button
                                   className="delete-btn"
                                   type="button"
                                   onClick={(e) => handleDelete(_id, e)}>
                                   Delete
                              </button>
                         </>
                    )}
               </div>
          </li>
     ));

     return (
          <ul className="todo-list">
               {data.length > 0 ? (
                    listItem
               ) : (
                    <li className="todo-work">
                         <div className="input-box">
                              <input type="text" value="More work, please!" readOnly />
                         </div>
                    </li>
               )}
          </ul>
     );
}
