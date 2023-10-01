document.addEventListener("DOMContentLoaded", function () {
     class ComponentCreator {
          static create(name, callback) {
               class CustomComponent extends HTMLElement {
                    constructor() {
                         super();
                    }
                    connectedCallback() {
                         callback();
                    }
               }
               customElements.define(name, CustomComponent);
          }
     }

     class F8Library {
          constructor() {
               this.components = {};
               this.data = {};
          }

          component(name, options) {
               this.components[name] = options;
               if (options.data) {
                    this.data[name] = options.data();
               }
               ComponentCreator.create(name, () => {
                    this.renderComponent(name);
               });
          }

          renderComponent(name) {
               const component = this.components[name];
               if (component) {
                    const element = document.querySelector(name);
                    if (element) {
                         let template = component.template;
                         const data = this.data[name];
                         if (data) {
                              for (const key in data) {
                                   const regex = new RegExp(`{{${key}}}`, "g");
                                   template = template.replace(regex, data[key]);
                              }
                         }
                         element.innerHTML = template;

                         const buttons = element.querySelectorAll(
                              "[v-on\\:click], [v-on\\:dblclick]"
                         );
                         buttons.forEach((btn) => {
                              const clickAction = btn.getAttribute("v-on:click");
                              const dblclickAction = btn.getAttribute("v-on:dblclick");
                              if (clickAction) {
                                   btn.addEventListener("click", () => {
                                        eval(`this.data['${name}'].${clickAction}`);
                                        this.renderComponent(name);
                                   });
                              }
                              if (dblclickAction) {
                                   btn.addEventListener("dblclick", () => {
                                        eval(`this.data['${name}'].${dblclickAction}`);
                                        this.renderComponent(name);
                                   });
                              }
                         });
                    }
               }
          }
     }

     const F8 = new F8Library();

     F8.component("counter-app", {
          data: () => ({
               count: 0,
               title: "Counter App",
          }),
          template: `
               <h1>{{title}}</h1>
               <h2>Đã đếm: {{count}} lần</h2>
               <button v-on:click="count--">-</button>
               <button v-on:click="count++">+</button>
               <button v-on:dblclick="title='Xin chao F8'">Change Title</button>
          `,
     });
     F8.component("header-component", {
          template: `<h1>HEADER</h1>`,
     });
});
