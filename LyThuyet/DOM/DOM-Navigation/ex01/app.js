// var products = document.querySelector(".products");
// var productFirst;
// var productActive = (productFirst = document.querySelector(".active"));
// var btnNext = document.querySelector(".next");
// var btnPrev = document.querySelector(".prev");

// // var productFirst = productActive;
// var productLast = products.lastElementChild;

// const handleNext = function () {
//      var nextElement = productActive.nextElementSibling;
//      console.log(nextElement);
//      if (nextElement === null) {
//           nextElement = productFirst;
//      }
//      nextElement.classList.add("active");
//      productActive.classList.remove("active");

//      productActive = nextElement;
// };
// const handlePrev = function () {
//      var prevElement = productActive.previousElementSibling;
//      console.log(prevElement);
//      if (prevElement === null) {
//           prevElement = productLast;
//      }
//      prevElement.classList.add("active");
//      productActive.classList.remove("active");

//      productActive = prevElement;
// };
// btnNext.addEventListener("click", handleNext);
// btnPrev.addEventListener("click", handlePrev);

// document.addEventListener("keyup", function (e) {
//      console.log(e);
//      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
//           handleNext();
//      }
//      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
//           handlePrev();
//      }
// });

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const mainSelected = $(".main_select");
const selects = $$(".select");

console.log(selects);
mainSelected.addEventListener("change", function () {
     // [...selects].map((item) => item.setAttribute("checked", "checked"));
     var checkAllStatus = this.checked;
     console.log(this.checked);
     selects.forEach(function (select) {
          select.checked = checkAllStatus;
     });
});

selects.forEach(function (select) {
     select.addEventListener("change", function () {
          var status = Array.from(selects).every(function (item) {
               return item.checked;
          });
          mainSelected.checked = status;
     });
});
