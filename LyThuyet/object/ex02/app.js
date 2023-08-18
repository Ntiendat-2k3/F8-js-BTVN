// var user = {
//      name: "NTienDat",
//      email: "nguyentiendatg2003@gmail.com",
//      getName: function () {
//           return this.name;
//      },
// };
// var customer = {
//      name: "John",
//      email: "John@gmail.com",
//      getName: function () {
//           return this.name;
//      },
// };
// => Tạo 1 bản thiết kế cho object
// function constructor (hàm tạo)
// console.log(user);
// console.log(customer);

var Person = function (name, email) {
     this.name = name;
     this.email = email;
     this.getName = function () {
          return this.name;
     };
};
// console.log(Person());
Person.prototype.message = "F8 - Fullstack";

// Tạo đối tượng từ hàm tạo
var person = new Person("NTienDat", "nguyentiendatg2003@gmail.com");
console.log(person);
// console.log(person.name);
// console.log(person.getName());
var user = new Person("John", "John@gmail.com");
console.log(user);
console.log(person.message);
console.log(user.message);

Array.prototype.first = function () {
     console.log(this);
     return this[0];
};
var a = ["Nguyen", "Tien", "Dat"];
console.log(a.first());

// Kiểm tra object thuộc hàm tạo nào ?
console.log(person.constructor.name);
console.log(a.constructor.name);

// Xây dựng 1 hàm nội bộ từ hàm tạo
// var getMsg = function () {
//      console.log("Hello F8");
// };
// getMsg();
Person.isPerson = function (variable) {
     return variable && variable.constructor.name === "Person";
};
if (Person.isPerson(person)) {
     console.log("Day la person");
} else {
     console.log("Day khong la person");
}
console.log(Person);

// BT
var a = {
     name: "NTienDat",
     email: "nguyentiendatg2003@gmail.com",
};
var b = {
     teacher: "Hoang An",
     salary: 5000,
};
// Nối object b vào object a
for (var key in b) {
     a[key] = b[key];
}
console.log(a);
Object.keys(b).forEach((key) => {
     a[key] = b[key];
});
console.log(a);
/// Object.assign()
var result = Object.assign(a, b);
console.log(result);

// BT
var query = {
     name: "Hoang An",
     keyword: "Fullstack",
     category: 1,
};
// name = Hoang+An&keyword=Fullstack&category=1
console.log(Object.entries(query));
var resultX = Object.entries(query)
     .map((item) => {
          return item.join("=");
     })
     .join("&")
     .replaceAll(" ", "+");
console.log(resultX);

/// Object.create(null) => Tạo object không có prototype
var a = Object.create(null);
console.log(a);

var a1 = {
     name: "Hoang An",
     email: "hoangan.web@gmail.com",
};
var b1 = Object.assign({}, a); // Sao chép
// var b1 = {...a};
// var b1 = JSON.parse(JSON.stringify(a))
b1.name = "Hoang An F8";
console.log(a1);
console.log(b1);
