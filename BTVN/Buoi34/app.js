import { getTasks, postTasks, editTasks, deleteTasks, getTaskDetails } from "./handleTask.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const container = $(".container");
const addTodosBtn = $(".add-todos");
let isEditting = false;

// Hàm tạo phần tử DOM
function createElement(tag, props, ...children) {
     const el = document.createElement(tag);
     Object.assign(el, props);
     el.append(...children);
     return el;
}

// Hiển thị nhiệm vụ
function renderTask(id, name, done) {
     return createElement(
          "div",
          { className: "task-container" },
          createElement(
               "div",
               { className: "task-wrap" },
               createElement("span", {
                    className: "name-task",
                    textContent: name,
                    dataset: { id },
               }),
               createElement(
                    "div",
                    { className: "button-container" },
                    createElement("button", {
                         className: "btn btn-trash",
                         innerHTML: '<i class="fa-solid fa-trash"></i>',
                    }),
                    createElement("button", {
                         className: "btn btn-edit",
                         innerHTML: '<i class="fa-solid fa-pen-to-square"></i>',
                    }),
                    createElement("button", {
                         className: "btn btn-check",
                         innerHTML: '<i class="fa-solid fa-check-to-slot"></i>',
                    })
               )
          )
     );
}

// Hiển thị các nhiệm vụ từ API
async function renderTasksUI() {
     try {
          const tasks = await getTasks();
          tasks.forEach((task) => {
               const taskElement = renderTask(task.id, task.name, task.done);
               if (task.done) {
                    taskElement.classList.add("task-complete", "hidden");
               }
               container.appendChild(taskElement);
          });
     } catch (e) {
          console.error("Lỗi khi tải nhiệm vụ:", e);
     }
}

container.addEventListener("click", handleTaskEvent);

// Handle Modal
const modal = createElement(
     "div",
     { className: "modal hidden" },
     createElement("div", { className: "overlay" }),
     createElement(
          "form",
          { className: "form-add" },
          createElement(
               "div",
               { className: "input" },
               createElement("input", {
                    required: true,
                    type: "text",
                    id: "taskName",
                    placeholder: "Add Todos",
               })
          ),
          createElement(
               "div",
               { className: "btn-wrap" },
               createElement("button", {
                    type: "submit",
                    className: "btn btn-save",
                    textContent: "Save",
               }),
               createElement("button", {
                    type: "button",
                    className: "btn btn-cancel",
                    textContent: "Cancel",
               })
          )
     )
);
document.body.appendChild(modal);
addTodosBtn.addEventListener("click", (e) => {
     e.preventDefault();
     modal.classList.toggle("hidden");
});
document.querySelector(".btn-cancel").addEventListener("click", () => {
     modal.classList.add("hidden");
});
renderTasksUI();

// Handle Add Task
async function handleAddTasks() {
     const taskName = formAdd.querySelector("input[type='text']").value;

     if (taskName.trim() === "") {
          alert("Task name cannot be empty");
          return;
     }
     const newTask = {
          name: taskName,
          done: false,
     };

     try {
          await postTasks(newTask);
          renderTasks(newTask.id, newTask.name, newTask.done);
          document.getElementById("taskName").value = "";
     } catch (e) {
          console.error("Error adding task: ", e);
     }
     modal.classList.remove("is-show");
}

// Handle editing an existing task
async function handleEditTask(taskId) {
     const modalInput = formAdd.querySelector("input[type='text']");
     const editedTaskName = modalInput.value.trim();
     if (!editedTaskName) {
          alert("Task name cannot be empty");
          return;
     }

     try {
          // Update the task on the API
          await editTasks(taskId, editedTaskName, false);
          // Update the task name in the UI
          const nameTaskEle = document.querySelector(`.name-task[data-id='${taskId}']`);
          nameTaskEle.textContent = editedTaskName;
          modal.classList.remove("is-show");
     } catch (error) {
          console.error("Error updating task", error);
     }
}

// Add an event listener to the form submit button to handle adding/editing a task
formAdd.addEventListener("submit", async function (e) {
     e.preventDefault();

     if (isEditting) {
          // Handle editing the existing task
          const taskId = formAdd.dataset.taskId;
          handleEditTask(taskId);
          isEditting = false; // Reset the editing flag
     } else {
          // Handle adding a new task
          handleAddTasks();
     }
});

function renderBtnCompleteTodos(number) {
     const completeTextEle = document.createElement("span");
     completeTextEle.className = "text";
     completeTextEle.textContent = "Completed Todos ";
     const completeNumberEle = document.createElement("span");
     completeNumberEle.className = "number";
     completeNumberEle.textContent = `${number} `;

     const circleIconEle = document.createElement("i");
     circleIconEle.className = "fa-solid fa-circle-right";

     const completeBtnEle = document.createElement("button");
     completeBtnEle.type = "button";
     completeBtnEle.className = "btn-complete-todos";

     completeBtnEle.appendChild(completeTextEle);
     completeTextEle.appendChild(completeNumberEle);
     completeBtnEle.appendChild(circleIconEle);

     const buttonsContainer = document.createElement("div");
     buttonsContainer.className = "buttons-container";

     buttonsContainer.appendChild(completeBtnEle);

     container.appendChild(buttonsContainer);
}

renderBtnCompleteTodos(0);

// Handle Loading
const loadingElement = $(".loading");
const buttonArray = $$("button");
console.log(buttonArray);
