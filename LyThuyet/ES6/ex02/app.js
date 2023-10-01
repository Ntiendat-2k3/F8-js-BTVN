/// Spread
/// Object
const oldObj = {
     name: "Ntiendat",
     age: 20,
};
const newObj = { course: "FullStack", ...oldObj };
console.log(newObj);

/// Array
const oldArr = ["Ntiendat", "ntiendat@gmail.com"];
const newArr = ["Fullstack", ...oldArr];
console.log(newArr);

/// Function
const getTotal = (a, b) => {
     console.log(a, b);
};
const values = [10, 20];
getTotal(...values);

/// Enhance Object Literal
const name = "Hoang An";
const email = "hoangan@gmail.com";
const age = undefined;
const user1 = {
     name,
     email,
     age,
};
console.log(user1);

const result = {
     sum(a, b) {
          return a + b;
     },
     div(a, b) {
          return a / b;
     },
};
console.log(result.sum(5, 5));

