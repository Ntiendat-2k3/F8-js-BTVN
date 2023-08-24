/// Number: kiểu dữ liệu nguyên thủy
console.log([Number]);
var a = 10;
console.log(a, typeof a);

/// Kiểm tra 1 biến có phải số hay không ?
if (typeof a === "number") {
     console.log("La so");
     // Kiểm tra số nguyên
     if (Number.isInteger(a)) {
          console.log("So nguyen");
     } else {
          console.log("Khong la so nguyen");
     }
} else {
     console.log("Khong la so");
}

/// Số NaN : Not a Number
var b = NaN;
console.log(b, typeof b);
//: Trả về NaN =>
// - Ép kiểu thất bại
// - Thực hiện các biểu thức số học mà có 1 toán hạng mang giá trị NaN hoặc do quá trình tự động ép kiểu khi thực hiện phép toán
console.log(+"F8"); // NaN  không thể ép string -> number

if (!Number.isNaN(+"F8")) {
     console.log("F8");
} else {
     console.log("NaN: Không tính toán đc");
}

/// Infinity
console.log(1000 ** 1000); // Infinity
// Kiem tra
if (10000 === Infinity) {
     console.log("Đây là số Infinity");
} else {
     console.log("Không phải số Infinity");
}

/// =>
if (typeof a === "number" && !Number.isNaN(a) && a !== Infinity) {
     console.log("La so");
}

/// Ép kiểu
// => ép kiểu số nguyên
console.log(Number.parseInt("10a123")); // 10 => đọc trừ trái sang phải gặp chữ back ra luôn
console.log(Number.parseInt("10.a123")); // 10
console.log(Number.parseFloat("10.5a123")); // 10.5

/// Ép kiểu số (số nguyên, số thực): 1 ký tự không đọc đc => NaN luôn
console.log(Number("10a123")); // NaN
console.log(+"10a123"); // NaN

// BT : Tính tổng các số chẵn của mảng sau
var numbers = [1, 2, 3, 4, 5, "abc", 6, NaN, 7];
const result = numbers.reduce((total, curr) => {
     if (typeof curr === "number" && !Number.isNaN(curr) && curr !== Infinity) {
          return total + curr;
     }
     return total;
}, 0); 
console.log(result); 



// toFixed(): Lấy số chữ số phần thập phân => trả về 1 chuỗi
var a = 10.567;
console.log(a.toFixed(2)); // 10.57
console.log(a.toFixed(1)); // 10.6
console.log(a.toFixed()); // 11

// toString(): chuyển số thành chuỗi
console.log(a.toString());
console.log(a + "");

// Định dạng số
var price = 555000;
console.log(
     price.toLocaleString("en", {
          style: "currency",
          currency: "USD",
     })
); // $555,000.00

// 
console.log(Math);