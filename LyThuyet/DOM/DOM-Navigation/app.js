// Dom Navigation

// Chọn thành phần cha
// sử dụng parentElement => trả về Element Node
// parentNode => trả về Node => học sau

// Chọn thành phần con
// children => trả về 1 obj danh sách các thành phần con trực tiếp

// Chọn thành phần liền trước

// Chọn thành phần liền sau
var btn = document.querySelector(".btn");
// console.log(btn);
// console.log(btn.parentElement);
// console.log(btn.parentElement.parentElement);
var todos = document.querySelector(".todos");

var remove = document.querySelectorAll(".remove");

remove.forEach((item) => {
     item.addEventListener("click", function () {
          item.parentElement.remove();
     });
});

var menu = document.querySelector(".menu");
// var menuList = menu.children;
// console.log(menuList[1].children[1].children[0].innerText);


