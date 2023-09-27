component.create("todo-item", function () {
     var doName = this.innerText;
     var templateHtml = `
          <div class="todo">
               <input type="checkbox" />
               <span>${doName}</span>
          </div>
     `;
     var template = document.createElement("template");
     template.innerHTML = templateHtml;
     var templateNode = template.content.cloneNode(true);
     console.log(templateNode);
     templateNode.children[0].children[0].addEventListener("click", function () {
          // input
          console.log("oke");
     });

     var shadow = this.attachShadow({
          mode: "open",
     });
     shadow.prepend(templateNode);

     var style = document.createElement("style");
     style.textContent = `
          .todo {
               border: 1px solid red;
               padding: 5px;
               margin: 5px 0;
          }
     `;
     shadow.prepend(style);
     // append: ko nên html phải load trc css
});
