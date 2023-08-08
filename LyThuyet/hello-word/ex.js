// Tinh tien luong
/*
var salary = 15.000.000
=> Tinh luong nhan sau khi da tru thue 
- Neus luong < 5tr => Thue = 3%
- Neus luong tu 5tr den 15tr => Thue = 5%
- Neus luong > 15tr => Thue = 10%
*/
const salary = 15000000;
let tax;
if (salary) {
     if (salary < 5000000) {
          tax = 3;
     } else if (salary > 15000000) {
          tax = 10;
     } else {
          tax = 5;
     }
}
const salaryReal = salary - (salary * tax) / 100;
console.log("salaryReal: ", salaryReal);
