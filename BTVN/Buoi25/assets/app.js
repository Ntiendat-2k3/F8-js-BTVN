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
}

const dotItems = $$(".slider-dot-item");

[...dotItems].forEach((item) =>
     item.addEventListener("click", function (e) {
          [...dotItems].forEach((el) => el.classList.remove("active"));
          e.target.classList.add("active");
          const currIndex = parseInt(e.target.getAttribute("data-index"));
          position = -currIndex * sliderItemWidth;
          sliderMain.style.transform = `translateX(${position}px)`;
          index = currIndex;
     })
);

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
