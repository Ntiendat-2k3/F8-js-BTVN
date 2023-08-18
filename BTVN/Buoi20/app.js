
//  Bài 1
var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];

// function intersection(arrA, arrB) {
//      return arrA.filter((ele) => arrB.includes(ele));
// }
function intersection(arrA, arrB) {
     return arrA.reduce((result, currValue) => {
          if (arrB.includes(currValue)) {
               result.push(currValue);
          }
          return result;
     }, []);
}
console.log(intersection(arrA, arrB));

// Bài 2
function flatArray(arr) {
     return arr.reduce((result, ele) => {
          if (Array.isArray(ele)) {
               return result.concat(flatArray(ele));
          } else {
               result.push(ele);
               return result;
          }
     }, []);
}
console.log(flatArray([0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]]));

// Bài 3
// var arr = [
//      ["a", 1, true],
//      ["b", 2, false],
// ];
// function transpose(matrix) {
//      return matrix[0].map((col, i) => matrix.map((row) => row[i]));
// }
// console.log(transpose(arr));

var arr = [
     ["a", 1, true, { name: "NTienDat" }, [1, 2]],
     ["b", 2, false, { name: "John" }, [1, 2]],
];
var result = [];
for (var i = 0; i < arr[0].length; i++) {
     var subArray = [];
     for (var j = 0; j < arr.length; j++) {
          if (typeof arr[j][i] === typeof arr[0][i]) {
               subArray.push(arr[j][i]);
          }
     }
     result.push(subArray);
}
console.log(result);

// Bài 4
import array from "./article.js";
function render() {
     const result = array.map((item, index) => {
          const isOdd = index % 2 !== 0;
          const imgClass = isOdd ? " odd" : "";

          return `
               <div class="item">
                    <div class="item_img${imgClass}">
                         <img
                              src="${item.img}"
                              alt="img"
                         />
                    </div>
                    <div class="item_content">
                         <h2 class="item_title">${item.title}</h2>
                         <p class="item_desc">
                              ${item.desc}
                         </p>
                    </div>
               </div>
          `;
     });
     console.log(result);
     document.body.insertAdjacentHTML("beforeend", result.join(""));
}
render();
