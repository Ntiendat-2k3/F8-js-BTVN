const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btn = $(".btn");
const overlay = $(".overlay");
const icon = $(".icon");
const content = $(".content");

btn.addEventListener("click", function () {
     content.classList.add("open");
     btn.disable = true;
     btn.classList.add("bg-gray-400", "cursor-none");
     overlay.style.display = "block";
});

icon.addEventListener("click", function () {
     content.classList.remove("open");
     btn.disable = false;
     btn.classList.remove("bg-gray-400", "cursor-none");
     overlay.style.display = "none";
});
overlay.addEventListener("click", function (e) {
     if (e.target === overlay) {
          content.classList.remove("open");
          overlay.style.display = "none";
          btn.classList.remove("bg-gray-400", "cursor-none");
     }
});
