for (let i = 0; i <= 10; i += 2) {
     console.log(i);
}

let n = 10;
let total = 0;
for (let i = 1; i <= n; i++) {
     if (i % 2 === 0) {
          total += i;
     }
}
console.log(total);

function sum(n) {
     if (n === 2) {
          return 2;
     } else {
          return n + sum(n - 2);
     }
}
console.log(sum(10));

var v = 5;
let total1 = 1;
let result = 0;
for (let i = 1; i <= v; i++) {
     total1 *= i;
     result += total1;
}
console.log(result);

// function sum1(n) {
//      if (n === 1) {
//           return 1;
//      } else {
//           const result = n * sum1(n) * sum1(n - 1);
//           return n! * sum1(n - 1);
//      }
// }
// console.log(sum1(5));

function drawTriangle(N) {
     for (let i = 1; i <= N; i++) {
          for (let j = 1; j <= i; j++) {
               document.write("* ");
          }
          document.write("<br>");
     }
}
drawTriangle(5);

/// while, do...while
var i = 1;
while (i <= 5) {
     console.log(i);
     i++;
}


