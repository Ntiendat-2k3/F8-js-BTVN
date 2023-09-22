var content = document.querySelector(".content");
console.log(content);
HTMLElement.prototype.css = function (style = {}) {
     Object.assign(this.style, style);
     console.log(style);
     console.log(this.style);
};
content.css({
     color: "red",
     fontWeight: "bold",
});
