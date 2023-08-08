// Bài 02
var arrInt = [5, 1, 9, 8, 10, 11];
function isPrime(n) {
     if (n <= 1) return false;
     for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
     }
     return true;
}
function sumIsPrime(arr) {
     let total = 0;
     for (let i = 0; i <= arr.length - 1; i++) {
          if (isPrime(arr[i])) {
               total += arr[i];
          }
     }
     return total;
}
console.log(sumIsPrime(arrInt));

// Bài 03

// Bài 04
var numbers = [5, 1, 9, 8, 10];
var element = 4;
function IncreaseArr(arr, n) {
     const newArr = [...arr];
     newArr.push(n);
     return newArr.sort((a, b) => a - b);
}
console.log(IncreaseArr(numbers, element));
