const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sliderMain = $(".slider-main");
const sliderItems = $$(".slider-item");
const sliderItemWidth = sliderItems[0].offsetWidth;
const prev = $(".slider-prev");
const next = $(".slider-next");
const dotItems = $$(".slider-dot-item");
let position = 0;
let index = 0;

next.addEventListener("click", () => handleChangeSlide(1));
prev.addEventListener("click", () => handleChangeSlide(-1));

dotItems.forEach((item, index) => {
     item.addEventListener("click", () => handleDotClick(index));
});

function handleChangeSlide(direction) {
     index += direction;
     index = Math.min(Math.max(index, 0), sliderItems.length - 1);
     position = -index * sliderItemWidth;
     updateSlider();
}

function handleDotClick(clickedIndex) {
     index = clickedIndex;
     position = -index * sliderItemWidth;
     updateSlider();
}

function updateSlider() {
     sliderMain.style.transform = `translateX(${position}px)`;
     dotItems.forEach((el) => el.classList.remove("active"));
     dotItems[index].classList.add("active");
}
