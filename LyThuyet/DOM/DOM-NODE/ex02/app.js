/// Scroll event
/// lấy vị trí scroll so với top, left

const backToTop = document.querySelector(".top");
window.addEventListener("scroll", function () {
     // console.log("Scroll");
     var y = window.scrollY;
     var x = window.scrollX;
     console.log(x, y);
     if (y > 50) {
          backToTop.classList.add("show");
     } else {
          backToTop.classList.remove("show");
     }
});

window.addEventListener("load", function () {
     var bodyHeight = document.body.clientHeight;
     console.log(bodyHeight);
     window.scroll(0, bodyHeight); // tự động kéo xuống cuối
});
backToTop.addEventListener("click", function () {
     window.scroll(0, 0);
});
