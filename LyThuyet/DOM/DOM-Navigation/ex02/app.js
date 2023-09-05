var carosuel = document.querySelector(".carosuel");
var carosuelInner = carosuel.querySelector(".carosuel-inner");
var nextBtn = carosuel.querySelector(".next");
var prevBtn = carosuel.querySelector(".prev");

// lấy kích thước của item
var itemWidth = carosuelInner.clientWidth; // lấy chiều rộng của 1 element
console.log(itemWidth)

// lấy tất cả items
var items = carosuelInner.children;
console.log(items);

// Tính tổng kích thước các items
var totalWidth = items.length * itemWidth;
console.log(totalWidth);

// Cập nhật CSS cho carosuel inner
carosuelInner.style.width = `${totalWidth}px`;

var position = 0;
nextBtn.addEventListener("click", function () {
     console.log(position);
     if (Math.abs(position) < totalWidth - itemWidth) {
          position -= itemWidth;
          carosuelInner.style.translate = `${position}px`;
     }
});
prevBtn.addEventListener("click", function () {
     console.log(position);
     if (Math.abs(position) > 0) {
          position += itemWidth;
          carosuelInner.style.translate = `${position}px`;
     }
});
