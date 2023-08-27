const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// const handleClick = () => {
//      console.log("register");
// };
// const handleInput = () => {
//      console.log("handleInput");
// };

/// Event Listener
const btn = $(".btn");
const login = $(".login-btn");
btn.addEventListener("click", () => {
     console.log("Register successful");
});
btn.addEventListener("click", () => {
     console.log("Register successful2");
});

/// removeEventListener(type, listener) : xóa sự kiện
const handleClick = () => {
     console.log("Action");
}
login.addEventListener("click", () => {
     console.log("Successfully");
     login.removeEventListener("click", handleClick);
});
