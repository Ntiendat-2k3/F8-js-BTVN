// Event Object
// e.target

const $ = document.querySelector.bind(document);
const btn = $(".btn");
const content = $(".content");
const link = $(".link");
const menu = $(".menu");

btn.addEventListener("click", function (e) {
     // console.log(this); // lấy El đc add event
     // console.log(e.target); // Tác động ở đâu lấy ở đó , giống nhau trong trong El không có tk nào nx
     content.innerHTML = `<button class="remove inline-block px-5 py-3 text-white bg-blue-400 rounded-lg">Click</button>`;
});
content.addEventListener("click", function (e) {
     console.log(e.target);
     console.log(this);
     if (e.target.classList.contains("remove")) {
          e.target.remove();
     }
});

// 2. event.preventDefault(): Ngăn hành động mặc định của thẻ html
link.addEventListener("click", function (e) {
     e.preventDefault();
     console.log(this.href);
});

document.addEventListener("contextmenu", function (e) {
     e.preventDefault();
     menu.style.display = "block";
     menu.style.top = `${e.clientY}px`;
     menu.style.left = `${e.clientX}px`;
});
document.addEventListener("click", function (e) {
     menu.style.display = "none";
});
menu.addEventListener("click", function (e) {
     e.stopPropagation(); // ngăn hành vi mặc định or check có chứa
});
