// Bài 1: N số fibonacci
function fibo(n, prev = 0, curr = 1, result = []) {
     if (n === 0) {
          return result;
     }
     result.push(prev);
     return fibo(n - 1, curr, prev + curr, result);
}
console.log(fibo(10));

// Bài 2: Đảo ngược số
// function reverseNumber(n) {
//      if (typeof n !== "number") {
//           return null;
//      }
//      return n.toString().split("").reverse().join("");
// }
function reverseNumber(n) {
     if (typeof n !== "number") {
          return null;
     }
     const numberString = n.toString();
     let reverseString = "";
     for (let i = numberString.length - 1; i >= 0; i--) {
          reverseString += numberString[i];
     }
     return parseInt(reverseString);
}
console.log(reverseNumber(12345));

// Bài 3: Viết hàm chuyển số thành chữ
function numberToWords(number) {
     if (number === 0) {
          return "0";
     }

     const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
     const teens = [
          "mười",
          "mười một",
          "mười hai",
          "mười ba",
          "mười bốn",
          "mười lăm",
          "mười sáu",
          "mười bảy",
          "mười tám",
          "mười chín",
     ];
     const tens = [
          "",
          "mười",
          "hai mươi",
          "ba mươi",
          "bốn mươi",
          "năm mươi",
          "sáu mươi",
          "bảy mươi",
          "tám mươi",
          "chín mươi",
     ];
     const thousands = ["", "nghìn", "triệu", "tỷ"];

     const numArray = Array.from(number.toString(), Number).reverse();
     const wordsArray = [];
     let thousandsIndex = 0;

     for (let i = 0; i < numArray.length; i++) {
          if (i % 3 === 0) {
               wordsArray.push(thousands[thousandsIndex]);
               thousandsIndex++;
          }

          const digit = numArray[i];

          if (i % 3 === 2 && digit !== 0) {
               wordsArray.push("trăm");
          }

          switch (i % 3) {
               case 1:
                    if (digit === 1) {
                         wordsArray.push(teens[numArray[i - 1]]);
                         continue;
                    } else if (digit === 0) {
                         wordsArray.push(units[digit]);
                         continue;
                    }
                    wordsArray.push(tens[digit]);
                    break;
               case 0:
                    if (digit !== 0) {
                         wordsArray.push(units[digit]);
                    }
                    break;
          }
     }
     return wordsArray.reverse().join(" ");
}
const number = 4298;
const words = numberToWords(number);
console.log(words);
