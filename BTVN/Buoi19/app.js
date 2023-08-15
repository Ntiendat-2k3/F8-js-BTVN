// Bài 1
function findMinMaxOfArray(arr) {
     const sortArray = arr.sort((a, b) => a - b);
     const min = sortArray[0];
     const max = sortArray[sortArray.length - 1];
     const minIndex = arr.indexOf(min);
     const maxIndex = arr.indexOf(max);
     return {
          min,
          max,
          minIndex,
          maxIndex,
     };
}
console.log(findMinMaxOfArray([1, 3, 9, 5, 7, 2]));

// Bài 02
var arrInt = [5, 1, 9, 8, 10, 11];
function isPrime(n) {
     if (n <= 1) return false;
     for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
     }
     return true;
}
// function sumIsPrime(arr) {
//      let total = 0;
//      for (let i = 0; i <= arr.length - 1; i++) {
//           if (isPrime(arr[i])) {
//                total += arr[i];
//           }
//      }
//      return total;
// }
var result = arrInt.reduce((total, currentValue) => {
     if (isPrime(currentValue)) {
          return total + currentValue;
     }
     return total
}, 0)
// console.log(sumIsPrime(arrInt));
console.log(result);

// Bài 03
// function filterArray(arr) {
//      const uniqueArr = [...new Set(arr)];
//      return uniqueArr;
// }

// function filterArray(arr) {
//      return arr.filter((value, index, arrOrigin) => {
//           return arrOrigin.indexOf(value) === index;
//      });
// }

function filterArray(arr) {
     return arr.reduce((uniqueArr, currentValue) => {
          if (!uniqueArr.includes(currentValue)) {
               uniqueArr.push(currentValue);
          }
          return uniqueArr;
     }, []);
}
console.log(filterArray([3, 3, 5, 5, 5]));

// Bài 04
var numbers = [5, 1, 9, 8, 10];
var sortNumbers = numbers.sort((a, b) => a - b);
console.log(sortNumbers);
var element = 4;
// function IncreaseArr(arr, n) {
//      const newArr = [...arr];
//      newArr.push(n);
//      return newArr.sort((a, b) => a - b);
// }
// console.log(IncreaseArr(numbers, element));
function insertArr(arr, number) {
     let left = 0;
     let right = arr.length - 1;
     let insertPosition = arr.length;
     while (left <= right) {
          let mid = Math.floor((left + right) / 2);

          if (arr[mid] === number) {
               insertPosition = mid;
               break;
          } else if (arr[mid] < number) {
               left = mid + 1;
          } else {
               right = mid - 1;
               insertPosition = mid;
          }
     }
     arr.splice(insertPosition, 0, number);
     return arr;
}
console.log(insertArr(numbers, element));
