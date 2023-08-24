//  Bài 1
function sum(...numbers) {
     const result = numbers.reduce((total, curr) => {
          if (typeof curr !== "number" || Number.isNaN(curr) || !Number.isFinite(curr)) {
               throw new Error("Dữ liệu truyền vào không hợp lệ");
          }
          return total + curr;
     }, 0);
     return result;
}
try {
     console.log(sum(1, 2, 3, 4, 5));
} catch (error) {
     console.error(error.message);
}

//  Bài 2
Object.prototype.getCurrency = function (unit) {
     const numberic = +this;
     if (!isNaN(numberic)) {
          return numberic.toLocaleString("en") + " " + unit;
     } else {
          return "Invalid Number";
     }
};
var price1 = 12000;
console.log(price1.getCurrency("đ"));
var price2 = 12000000;
console.log(price2.getCurrency("đ"));

//  Bài 3
function convertToNestedArray(inputArray) {
     const categoryMap = {};
     const result = [];

     inputArray.forEach((item) => {
          categoryMap[item.id] = { ...item, children: [] };
     });

     inputArray.forEach((item) => {
          if (item.parent === 0) {
               result.push(categoryMap[item.id]);
          } else {
               categoryMap[item.parent].children.push(categoryMap[item.id]);
          }
     });

     return result;
}

const inputArray = [
     {
          id: 1,
          name: "Chuyên mục 1",
          parent: 0,
     },
     {
          id: 2,
          name: "Chuyên mục 2",
          parent: 0,
     },
     {
          id: 3,
          name: "Chuyên mục 3",
          parent: 0,
     },
     {
          id: 4,
          name: "Chuyên mục 2.1",
          parent: 2,
     },
     {
          id: 5,
          name: "Chuyên mục 2.2",
          parent: 2,
     },
     {
          id: 6,
          name: "Chuyên mục 2.3",
          parent: 2,
     },
     {
          id: 7,
          name: "Chuyên mục 3.1",
          parent: 3,
     },
     {
          id: 8,
          name: "Chuyên mục 3.2",
          parent: 3,
     },
     {
          id: 9,
          name: "Chuyên mục 3.3",
          parent: 3,
     },
     {
          id: 10,
          name: "Chuyên mục 2.2.1",
          parent: 5,
     },
     {
          id: 11,
          name: "Chuyên mục 2.2.2",
          parent: 5,
     },
];
console.log(convertToNestedArray(inputArray));

//  Bài 4
Array.prototype.reduce2 = function (callback, result) {
     let i = 0;
     if (arguments.length < 2) {
          result = this[0];
          i = 1;
     }
     for (; i < this.length; i++) {
          result = callback(result, this[i], i);
     }
     return result;
};
const numbers = [1, 2, 3, 4, 5];
const result = numbers.reduce2((total, curr) => {
     return total + curr;
}, 0);
console.log(result);
