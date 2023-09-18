// window.addEventListener("beforeunload", function (e) {
//      console.log(e);
//      e.preventDefault();
//      e.returnValue = "F8";
// });
// const submitBtn = document.querySelector("submit");
// submitBtn.addEventListener("submit", function () {});

var handleBeforeUnLoad = function (e) {
     e.preventDefault();
     e.returnValue = "Bạn chắc chắn muốn rời khỏi trang?";
};
const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("input", function (e) {
     console.log(e.target.defaultValue, e.target.value);
     if (e.target.defaultValue !== e.target.value) {
          window.addEventListener("beforeunload", handleBeforeUnLoad);
     } else {
          window.removeEventListener("beforeunload", handleBeforeUnLoad);
     }
});
loginForm.addEventListener("submit", function () {
     e.preventDefault();
     window.removeEventListener("beforeunload", handleBeforeUnLoad);
     this.submit();
});
