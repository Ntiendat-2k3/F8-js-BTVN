const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const prev = $(".slider-prev");
const next = $(".slider-next");
const sliderMain = $(".slider-main");
const sliderItems = $$(".slider-item");
const sliderDots = $(".slider-dots");

let index = 0;
let position = 0;
const sliderItemWidth = sliderItems[0].offsetWidth;

for (let i = 0; i < sliderItems.length; i++) {
     const dotItem = document.createElement("li");
     dotItem.classList.add("slider-dot-item");
     dotItem.setAttribute("data-index", i.toString());
     sliderDots.appendChild(dotItem);
     if (i === 0) {
          dotItem.classList.add("active");
     }
}

const dotItems = $$(".slider-dot-item");
[...dotItems].forEach((item) =>
     item.addEventListener("click", function (e) {
          [...dotItems].forEach((el) => el.classList.remove("active"));
          e.target.classList.add("active");
          const currIndex = parseInt(e.target.dataset.index);
          position = -currIndex * sliderItemWidth;
          sliderMain.style.transform = `translateX(${position}px)`;
          index = currIndex;
     })
);

let isDragging = false;
let startX = 0;
let moveX = 0;

sliderMain.addEventListener("mousedown", (e) => {
     isDragging = true;
     startX = e.clientX;
     sliderMain.style.transition = "none";
});

// Bắt sự kiện mousemove để theo dõi sự di chuyển và cập nhật vị trí của slider
sliderMain.addEventListener("mousemove", (e) => {
     if (!isDragging) return;
     moveX = e.clientX - startX;
     sliderMain.style.transform = `translateX(${position + moveX}px)`;
});

// Bắt sự kiện mouseup để kết thúc kéo vuốt
sliderMain.addEventListener("mouseup", () => {
     if (!isDragging) return;
     isDragging = false;

     // Tính toán vị trí mới của slider sau khi kéo vuốt
     position += moveX;
     sliderMain.style.transition = "";

     // Xác định slide tiếp theo hoặc trở lại slide trước
     if (moveX > 0) {
          index = Math.max(0, index - 1);
     } else if (moveX < 0) {
          index = Math.min(sliderItems.length - 1, index + 1);
     }

     // Cập nhật vị trí của slider để hiển thị slide mới
     position = -index * sliderItemWidth;
     sliderMain.style.transform = `translateX(${position}px)`;

     // Cập nhật trạng thái active cho slider dot item tương ứng
     [...dotItems].forEach((el) => el.classList.remove("active"));
     dotItems[index].classList.add("active");
});

next.addEventListener("click", () => handleChangeSlider(1));
prev.addEventListener("click", () => handleChangeSlider(-1));

function handleChangeSlider(direction) {
     if (direction === 1) {
          if (index >= sliderItems.length - 1) {
               index = sliderItems.length - 1;
               return;
          }
          position -= sliderItemWidth;
          sliderMain.style.transform = `translateX(${position}px)`;
          index++;
     }
     if (direction === -1) {
          if (index <= 0) {
               index = 0;
               return;
          }
          position += sliderItemWidth;
          sliderMain.style.transform = `translateX(${position}px)`;
          index--;
     }
     [...dotItems].forEach((el) => el.classList.remove("active"));
     dotItems[index].classList.add("active");
}
