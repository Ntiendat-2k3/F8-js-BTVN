import { $, $$ } from "./helpers.js";
import { getTodo, postTodo, deleteTodo, updateTodo } from "./api.js";

const taskList = $(".task-list");
const taskListFinished = $(".task-list-completed");

export const render = async () => {
     const taskItemHtml = `
     <div class="task-action-list">
          <button class="task-action-item remove-btn">
               <i class="fa-solid fa-trash-can"></i>
          </button>
          <button class="task-action-item edit-btn">
               <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="task-action-item complete-btn">
               <i class="fa-solid fa-check"></i>
          </button>
     </div>`;
     const data = await getTodo();
     const todoUnfinished = data.filter((todo) => !todo.completed);
     const todoFinished = data.filter((todo) => todo.completed);

     const generateTodoHtml = (todos) => {
          return todos
               .map(
                    (todo) => `<div class="task-item">
               <p class="task-title">${todo.title}</p>
               ${taskItemHtml}
          </div>`
               )
               .join("");
     };

     taskList.innerHTML = generateTodoHtml(todoUnfinished);
     taskListFinished.innerHTML = `<button class="show-task-completed">
          Completed todos <span class="count-doto-completed">${todoFinished.length}</span>
     </button>
     <div class="list-unfinished-container hide">${generateTodoHtml(todoFinished)}</div>`;
};

render();
