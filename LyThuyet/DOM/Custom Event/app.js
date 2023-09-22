// Trigger Event
// Tự kích hoạt 1 event mà ko cần tác động của người dùng

var btn = document.querySelector(".btn");
btn.addEventListener("click", function () {
     console.log("Click me");
});

// setInterval(function () {
//   btn.click();
// }, 1000);

var quantityInput = document.querySelector(".quantity input");
var plusBtn = quantityInput.nextElementSibling;
quantityInput.addEventListener("change", function () {
     console.log(this.value);
});
var minusBtn = quantityInput.previousElementSibling;
var changeEvent = new Event("change");
minusBtn.addEventListener("click", function () {
     quantityInput.value--;
     if (quantityInput.value < 1) {
          quantityInput.value = 1;
     }
});

plusBtn.addEventListener("click", function () {
     quantityInput.value++;
     quantityInput.dispatchEvent(changeEvent);
});

var province = document.querySelector(".province");
province.addEventListener("change", function () {
     provinceId = this.value;
     console.log(provinceId);
});
var selectChangeEvent = new Event("change");
province.dispatchEvent(selectChangeEvent);
