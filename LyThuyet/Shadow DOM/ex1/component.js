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

