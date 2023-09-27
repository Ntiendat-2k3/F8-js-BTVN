var host = document.querySelector(".content");
var root = host.attachShadow({
     mode: "open",
});
console.log(root);
root.innerHTML = `<h1>F8 - Hoc lap trinh de di lam</h1>`;
var style = document.createElement("style");
style.textContent = `
     h1 {
          color: red;
     }
`;
root.prepend(style);
