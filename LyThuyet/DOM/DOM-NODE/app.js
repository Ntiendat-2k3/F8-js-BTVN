window.addEventListener("DOMContentLoaded", function () {
     var img = document.querySelector("img");
     console.log(img);
     console.log(img.width);
     img.id = "image";
});

window.addEventListener("load", function () {
     const preLoad = document.querySelector(".bg");
     // var img = document.querySelector("img");
     // console.log(img.width);
     preLoad.classList.add("hide");
     console.log(window.performance);
});
