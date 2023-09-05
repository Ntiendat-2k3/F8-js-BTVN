const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var content = $(".content");
var toggleBtn = $(".btn");
console.log(content.style); // Obj
// content.style.color = "red";
// content.style.fontWeight = "bold";
// content.style.fontSize = "20px";

var css = {
     color: "red",
     fontWeight: "bold",
     fontSize: "20px",
};
Object.assign(content.style, css);

// BT: Thêm các thuộc tính sau:
// - background-image
// - transition
// - transform

var editImg = {
     backgroundImage:
          "url(https://images.unsplash.com/photo-1511268594014-0e9d3ea5c33e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zmxhc2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60)",
     transition: ".25s linear",
     transform: "translateX(20px)",
};
Object.assign(content.style, editImg);
toggleBtn.addEventListener("click", () => {
     if (content.style.display === "none") {
          content.style.display = "block";
     } else {
          content.style.display = "none";
     }
});
