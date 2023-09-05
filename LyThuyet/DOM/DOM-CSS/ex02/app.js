const $ = document.querySelector.bind(document);
const btn = $(".btn");
// Xây dựng chức năng kéo thả
const handleDrag = function (e) {
     console.log(e.clientX, e.clientY);
     var left = e.clientX;
     var top = e.clientY;
     var css = {
          position: "relative",
          top: `${top - offsetY - 5}px`,
          left: `${left - offsetX - 5}px`,
     };
     Object.assign(btn.style, css);
};
var isDrag = false;
var offsetX, offsetY;
// Xác định hành động giữ và kéo chuột
btn.addEventListener("mousedown", function (e) {
     if (e.which === 1) {
          isDrag = true;
          offsetX = e.offsetX;
          offsetY = e.offsetY;
     }
});
document.addEventListener("mouseup", function () {
     isDrag = false;
});
document.addEventListener("mousemove", function (e) {
     if (isDrag) {
          handleDrag(e);
     }
});
document.addEventListener("mouseover", function () {
     btn.style.cursor = "move";
});
