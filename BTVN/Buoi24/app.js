const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addTask = $("#addTask");
const taskInput = $("#taskInput");
const taskList = $("#taskList");
let editingItem;

addTask.addEventListener("click", function (e) {
     e.preventDefault();
     let value = taskInput.value.trim();
     if (value) {
          let html = `
               <li class="w-full h-[50px] cursor-pointer ">
                    <div class="w-full item bg-purple-600 text-white text-lg flex justify-between items-center p-3 rounded-lg">
                         <span class="content">${value}</span>
                         <div class="icons flex gap-4">
                              <img src="./icons/edit.svg" alt="edit" class="edit w-4 h-4"/>
                              <img src="./icons/delete.svg" alt="delete" class="delete w-4 h-4" />
                         </div>
                    </div>

                    <form class="form-edit w-full flex hidden" autocomplete="off" >
                         <input
                              type="text"
                              value=""
                              class="p-3 rounded-tl rounded-bl outline-none w-[80%] border border-purple-600 bg-transparent text-white" />
                         <button
                              class="btn-update p-3 bg-purple-600 w-[20%] rounded-tr rounded-br text-white text-base border border-purple-600">
                              Update
                         </button>
                    </form>
               </li>
          `;
          taskList.insertAdjacentHTML("beforeend", html);
          taskInput.value = "";
     }
});

taskList.addEventListener("click", function (e) {
     if (e.target.classList.contains("delete")) {
          const item = e.target.closest("li");
          if (item) {
               item.remove();
          }
     }
     if (e.target.tagName === "SPAN") {
          e.target.classList.toggle("complete");
     }

     if (e.target.classList.contains("edit")) {
          const itemList = e.target.closest("li");
          console.log(itemList);
          if (itemList) {
               editingItem = itemList;

               const formEdit = itemList.querySelector(".form-edit");
               console.log(formEdit);
               const btnUpdate = formEdit.querySelector(".btn-update");
               const content = itemList.querySelector(".content");
               const item = itemList.querySelector(".item");

               item.classList.add("hidden");
               formEdit.classList.remove("hidden");

               const value = content.textContent;
               const inputEdit = formEdit.querySelector("input");
               inputEdit.value = value;

               btnUpdate.addEventListener("click", (e) => {
                    e.preventDefault();
                    const updateValue = inputEdit.value;
                    console.log(updateValue);

                    content.textContent = updateValue;
                    formEdit.classList.add("hidden");
                    item.classList.remove("hidden");

                    editingItem = null;
               });
          }
     }
});
