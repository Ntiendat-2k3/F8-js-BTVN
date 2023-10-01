/// C1: thuần
// const template = `
//      <p>Hello F8</p>
//      <h2>Fullstack Courses</h2>
// `;
// const templateEl = document.createElement("template");
// templateEl.innerHTML = template;
// const templateNode = templateEl.content.cloneNode(true);
// templateNode.children[0].style.color = "red";
// document.body.append(templateNode);

/// C2: Class
// customElements.define(
//      "hello-world",
//      class extends HTMLElement {
//           constructor() {
//                super();
//           }
//           connectedCallback() {
//                this.innerText = `Hello F8`;
//           }
//      }
// );

/// -------------------------------------
// class F8 {
//      constructor() {
//           console.log(this);
//      }
//      static component(name) {
//           console.log(this);
//           console.log(name);
//      }
// }
// new F8();
// F8.component("Hello-World");

/// -------------------------------------
const data = {
     count: 0,
     title: "F8",
};
Object.keys(data).forEach((key) => {
     window[key] = data[key];
});
count++;
console.log(count);
console.log(title);

/// -------------------------------------