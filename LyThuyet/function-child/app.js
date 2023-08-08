var welcome = "Welcome";
var getMessage = function (msg) {
     console.log("getMessage");
     var a = 10;
     var display = function () {
          console.log("Hello " + msg);
          console.log(`a = ${a}`);
          console.log(welcome + " " + msg);
     };
     display();
     // => gọi func cha -> func con chạy luôn
};
getMessage("F8");

var sum = function (a) {
     return function (b) {
          return a + b;
     };
};
var add = sum(10); // return function
console.log(add(5));
console.log(add(10));
console.log(sum(10)(10));

/// Timer
// setTimeout(
//      function (name, center) {
//           console.log("Xin chao", name, center);
//      },
//      2000,
//      "NTienDat",
//      "F8"
// );

// var count = 0;
// var id = setInterval(function () {
//      console.log(++count);
//      if (count === 10) {
//           clearInterval(id);
//      }
// }, 1000);

/// Đệ quy
var showNumber = function (n) {
     console.log(n);
     if (n > 1) {
          showNumber(n - 1);
     }
};
showNumber(5);

function sum1(n) {
     if (n <= 1) {
          return 1;
     }
     return n + sum1(n - 1);
}
console.log(sum1(3));

var fibo = function (n) {
     if (n === 1 || n === 2) {
          return 1;
     }
     return fibo(n - 1) + fibo(n - 2);
};
console.log(fibo(5));
