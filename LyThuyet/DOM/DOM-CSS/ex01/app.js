// Event Object
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btn = $(".btn");
const nameEl = $(".name");
btn.addEventListener("mousedown", function (e) {
     // mousedown => trái , giữa , phải ; click => chỉ trái th
     // e : event Object
     console.log("Clicked");
     console.log(this); // trả về Element gán sự kiện lên
     console.log(e);
     if (e.which === 3) {
          this.style.background = "purple";
     }
});
nameEl.addEventListener("keyup", function (e) {
     console.log(e);
     if (e.key === "Enter") {
          console.log(this.value);
     }
});
document.addEventListener("keyup", function (e) {
     // giữ Ctrl + Enter => chuyển cả trang thành màu đỏ
     // Enter => Khôi phục lại như ban đầu
     if (e.ctrlKey && e.key === "Enter") {
          document.body.style.background = "red";
     } else if (e.key === "Enter") {
          document.body.style.background = "Initial";
     }
});
