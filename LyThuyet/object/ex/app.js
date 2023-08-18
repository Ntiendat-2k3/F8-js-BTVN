// Thêm phương thức vào prototype
Object.prototype.combine = function (...args) {
     var current = this;
     console.log(this);
     if (args.length > 0) {
          return args.map((key) => {
               return current[key];
          });
     }
};
// Thêm thuộc tính vào prototype
Object.prototype.message = "F8";

var user = {
     name: "NTienDat",
     email: "nguyentiendatg2003@gmail.com",
};
var customer = {
     name: "John",
     age: 18,
};
var result = user.combine("name", "email");
var result1 = customer.combine("name", "age");
console.log(result);
console.log(result1);

var a = "dat";
console.log(a.message);
var b = 1;
console.log(b.message);

//! Trừ null, undefined 

