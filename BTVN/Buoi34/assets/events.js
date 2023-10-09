import { $, $$, escapeHTML } from "./helpers.js";
import { getTodo, postTodo, deleteTodo, updateTodo } from "./api.js";
import { render } from "./render.js";

const addBtn = $(".add-todo-btn");
const addTodoPopup = $(".add-todo-popup");
const addTodoWrapper = $(".add-todo-wrapper");
const saveBtn = $(".save-btn");
const cancelAddBtn = $(".cancel-btn");
const searchInput = $(".search-input");
const taskList = $(".task-list");
const taskListFinished = $(".task-list-completed");

function handleTodoAction(action, todoList, filterCondition) {
     todoList.querySelectorAll(`.${action}-btn`).forEach((btn, i) => {
          btn.addEventListener("click", async () => {
               const todos = (await getTodo()).filter(filterCondition);
               if (action === "remove") {
                    await deleteTodo(todos[i].id);
               } else if (action === "edit") {
                    // Handle edit logic
               } else if (action === "complete") {
                    await updateTodo(todos[i].id, {
                         completed: !filterCondition(todos[i]),
                    });
               }
               render();
          });
     });
}

function addTodo() {
     let isAdd = false;

     addBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          addTodoPopup.classList.toggle("hide");
          isAdd = true;
     });

     addTodoWrapper.addEventListener("click", (e) => {
          e.stopPropagation();
     });

     cancelAddBtn.addEventListener("click", () => {
          addTodoPopup.classList.add("hide");
     });

     document.addEventListener("click", () => {
          if (!addTodoPopup.classList.contains("hide")) {
               addTodoPopup.classList.add("hide");
               isAdd = false;
          }
     });

     saveBtn.addEventListener("click", async () => {
          if (isAdd) {
               const value = escapeHTML(addTodoWrapper.querySelector("input").value);
               if (value) {
                    await postTodo({
                         title: value,
                         completed: false,
                    });
                    addTodoWrapper.querySelector("input").value = "";
                    addTodoPopup.classList.add("hide");
                    render();
                    isAdd = false;
               }
          }
     });
}

function search() {
     searchInput.addEventListener("input", (e) => {
          const value = e.target.value.toLowerCase();
          const tasks = document.querySelectorAll(".task-item");
          tasks.forEach((task) => {
               const title = task.querySelector(".task-title").textContent.toLowerCase();
               if (title.indexOf(value) === -1) {
                    task.classList.add("hide");
                    task.style.height = "0";
               } else {
                    task.classList.remove("hide");
                    task.style.height = "60px";
               }
          });
     });
}

function init() {
     handleTodoAction("remove", taskList, (todo) => !todo.completed);
     handleTodoAction("remove", taskListFinished, (todo) => todo.completed);
     handleTodoAction("complete", taskList, (todo) => !todo.completed);
     handleTodoAction("complete", taskListFinished, (todo) => todo.completed);
     addTodo();
     search();
}

init();
