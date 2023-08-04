// Bài 1: Hoán vị 2 số
let number1 = 10;
let number2 = 20;
number1 = number2 - number1;
number2 = number2 - number1;
number1 = number2 + number1;
console.log("Hoán vị: ", {
     number1,
     number2,
});

// Bài 2: Thực hiện phép toán
const sum = 10 + 20 + 5 ** 10 / 2;
console.log("Sum: ", sum);

// Bài 3: Tìm số lớn nhất
// function findMaxNumber(a, b, c) {
//      return Math.max(a, b, c);
// }
function findMaxNumber(a, b, c) {
     let max = a;
     if (b > max) {
          max = b;
     }
     if (c > max) {
          max = c;
     }
     return max;
}
console.log("Max number: ", findMaxNumber(2, 1, 3));

// Bài 4: Kiểm tra số cùng dấu
function check(a, b) {
     if (a !== 0 && b !== 0) {
          return (a < 0 && b < 0) || (a > 0 && b > 0);
     }
     return "số 0 không là số âm, dương";
}
console.log("2 số cùng dấu ? ", check(0, 5));

// Bài 5: Sắp xếp 3 số
// function sortNumber(a, b, c) {
//      return [a, b, c].sort((a, b) => (a - b ? 1 : -1));
// }
function sortIncreaseNumber(a, b, c) {
     if (a > b) {
          const temp = a;
          a = b;
          b = temp;
          // [a, b] = [b, a];
     }
     if (a > c) {
          const temp = a;
          a = c;
          c = temp;
          // [a, c] = [c, a];
     }
     if (b > c) {
          //a max, ss b vs c
          const temp = b;
          b = c;
          c = temp;
          // [b, c] = [c, b];
     }
     console.log("Inrease Number: ", a, b, c);
     // return [a, b, c];
}
sortIncreaseNumber(-5, 5, 0);
// console.log(sortIncreaseNumber(-5, 5, 0));
