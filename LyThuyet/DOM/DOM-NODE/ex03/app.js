var header = document.querySelector(".header");
var headerInner = header.querySelector(".header-inner");
var menu = header.querySelector(".menu");
var body = document.body;

var headerInnerHeight = headerInner.clientHeight;
console.log(headerInnerHeight);
var menuHeight = menu.clientHeight;
console.log(menuHeight);

window.addEventListener("scroll", function () {
     var y = window.scrollY;
     if (y >= headerInnerHeight) {
          menu.classList.add("fixed");
          body.style.paddingTop = `${menuHeight}px`;
     } else {
          menu.classList.remove("fixed");
          body.style.paddingTop = 0;
     }
});

window.addEventListener("load", function () {
     var menuItem = menu.querySelector("a");
     menuItem.addEventListener("click", function (e) {
          e.preventDefault();
          var hash = this.getAttribute("href");
          var homeSection = document.querySelector(hash);
          var offsetTop = homeSection.offsetTop;
          window.scroll(0, offsetTop - menuHeight - 15);
     });
});
