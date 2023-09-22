/// ===============================================================================
var component = {
     create: function (name, callback) {
          var Component = function () {
               return Reflect.construct(HTMLElement, [], this.constructor);
          };
          Component.prototype = Object.create(HTMLElement.prototype);
          Component.prototype.constructor = Component;
          Component.prototype.connectedCallback = callback;
          customElements.define(name, Component);
     },
};
/// ===============================================================================

component.create("hello-word", function () {
     this.innerText = "Hello F8";
});


component.create("image-component", function() {
     var link = this.getAttribute("link");
     this.innerHTML = `<div class="box-image">
     <img src="${link}"></div>`
});
