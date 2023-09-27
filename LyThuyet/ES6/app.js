// Arrow function
const getMessage = () => {
     console.log("Hello F8");
};
getMessage();

// Arrow function có 1 tham số
const getMessage2 = (msg) => {
     console.log(msg);
};
getMessage2("ntd");

// Arrow function có nhiều tham số
const getMessage3 = (msg, type = "success") => {
     console.log(msg, type);
};
getMessage3("F8", "error");

//
const getUser = () => ({
     name: "Hoang An",
     email: "hoangan@gmail.com",
});
console.log(getUser());

// Lồng nhiều function trong Arrow function
const getTotal = (a) => (b) => a + b;
const add = getTotal(10);
console.log(add(20));

const users = [
     {
          name: "Hoang An",
          email: "hoangan@gmail.com",
     },
     {
          name: "ntiendat",
          email: "ntiendat@gmail.com",
     },
];
const html = users
     .map((user) => {
          return `<h3>${user.name}</h3>
               <h3>${user.email}</h3>
               <hr>`;
     })
     .join("");
document.body.innerHTML = html;

const max = (...args) => {
     console.log(args);
};
max(1, 2, 3, 4, 5);


/**
 * Destructuring
 * Spread
 * Enhance literal Object
 * Classes
 */
