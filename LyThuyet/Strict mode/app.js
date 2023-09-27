"use strict"; //  Bật chế độ nghiêm ngặt cho cả file

var a = 10;
console.log(a);

function getMsg(msg) {
     console.log(msg);
}
getMsg("ntd");


/// Hoisting 
/**
 * Cơ chế mặc định của JS
 * Tự động đẩy khai báo biến và hàm lên trước đoạn code thực thi
 * Chỉ đẩy phần khai báo, không đẩy giá trị 
 * với Function: (Không áp dụng với function expression)
 * Không áp dụng từ khóa const, let 
 */

console.log(b);
var b = 10;

getMessage();
function getMessage() {
     console.log("Hello F8");
}



