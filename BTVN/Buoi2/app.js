/// Bài 1: Tính tiền taxi

let km, total;
total = 15000 + 13500 + 11000;
function calculateFee(km) {
     let fee = 0;
     if (km > 0) {
          if (km <= 1) {
               fee = 15000;
          } else if (km > 1 && km <= 5) {
               fee = 135000;
          } else if (km > 5) {
               fee = 11000;
          }
          if (km > 120) {
               fee = total - total * 0.1;
          }
     }
     return fee;
}
console.log(`Fee: ${calculateFee(150)}đ`);

/// Bài 2: Tính tiền điện

function tinhTiendien(soDienTieuThu) {
     const giaDien = [1.678, 1.734, 2.014, 2.536, 2.834, 2.927];
     const soBac = giaDien.length;
     let total = 0;

     let soDienTieuThuConLai = soDienTieuThu;

     for (let i = 0; i < soBac; i++) {
          if (soDienTieuThuConLai <= 0) break;
          const giaDienHienTai = giaDien[i];
          let soDienTieuThuHienTai;

          if (i === soBac - 1) {
               soDienTieuThuHienTai = soDienTieuThuConLai;
          } else if (i === 0 || i === 1) {
               soDienTieuThuHienTai = Math.min(soDienTieuThuConLai, 50);
          } else {
               soDienTieuThuHienTai = Math.min(soDienTieuThuConLai, 100);
          }
          total += giaDienHienTai * soDienTieuThuHienTai;
          soDienTieuThuConLai -= soDienTieuThuHienTai;
     }
     return total;
}
console.log(tinhTiendien(555));

/// Bài 3: Tính giá trị biểu thức

// function calculateExpression(n) {
//      let sum = 0;
//      for (let i = 1; i <= n; i++) {
//           sum += i * (i + 1);
//      }
//      return sum;
// }
function calculateExpression(n) {
     if (n === 1) {
          return 2;
     } else {
          return n * (n + 1) + calculateExpression(n - 1);
     }
}
console.log(`Sum: ${calculateExpression(5)}`);

///  Bài 4: Viết hàm kiểm tra số nguyên tố

function isPrimeNumber(n) {
     if (n <= 1) {
          return false;
     }
     for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) {
               return false;
          }
     }
     return true;
}
const number = 5;
if (isPrimeNumber(number)) {
     console.log(`${number} is prime number`);
} else {
     console.log(`${number} is not prime number`);
}

/// Bài 5: Vẽ tam giác số

console.log("=============== Tam giác số ===============");
function drawTriangleNumber(N) {
     // let counter = "*";
     let counter = 1;
     for (let i = 1; i <= N; i++) {
          let row = "";
          for (let j = 1; j <= i; j++) {
               row += counter + " ";
               counter++;
          }
          row += "\n";
          console.log(row);
     }
}
drawTriangleNumber(5);

///  Bài 6: Vẽ bàn cờ vua

console.log("=============== Bàn cờ vua ===============");
function drawChessboard(boardSize) {
     let chessPane = "";

     for (let row = 1; row <= boardSize; row++) {
          for (let col = 1; col <= boardSize; col++) {
               if ((row + col) % 2 === 0) {
                    chessPane += "⬜"; // Ô trắng ⬜
               } else {
                    chessPane += "⬛"; // Ô đen ⬛
               }
          }
          chessPane += "\n";
     }
     console.log(chessPane);
}
drawChessboard(8);

// Bài 7: Vẽ bảng cửu chương
console.log("=============== Bảng cửu chương ===============");
function drawMultiplicationTable() {
     const rowNum = 10;
     const colNum = 10;
     for (let i = 1; i <= rowNum; i++) {
          let multiplicationTable = "";
          for (let j = 1; j <= colNum; j++) {
               multiplicationTable += `${i} x ${j} = ${i * j}\t`;
          }
          console.log(multiplicationTable);
     }
}
drawMultiplicationTable();

// Bài 8: Tính giá trị biểu thức không dùng vòng lặp
console.log("======================================");
function sum(N) {
     if (N === 1) {
          return 1;
     } else {
          return 1 / N + sum(N - 1);
     }
}
console.log("Giá trị của biểu thức S là: ", sum(5));
