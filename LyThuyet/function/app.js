function getMessage(message, type = "success") {
     console.log("====================================");
     console.log(message, type);
     console.log("====================================");
}
getMessage("NTienDat");

function sum(a, b) {
     return a * b;
}
console.log(sum(5, 5));

function getMessage() {
     return msg;
}
function setMessage(value) {
     msg = value;
}
var msg = "Fullstack";
setMessage("NTienDat");
console.log(getMessage());

/// arguments
function max(a, b) {
     console.log(arguments);
     console.log(a, b);
}
max(5, 10, 15, 20);

/// rest parameter
function max1(result, ...args) {
     console.log(result);
     console.log(args);
}
max1("Max: ", 5, 10, 15, 20);

/// Expression function
var getMessage = function () {
     console.log("NTienDat");
};
getMessage();
if (typeof getMessage === "function") {
     console.log("Is function");
}
/// IIFE
(function (value) {
     console.log("NTienDat - " + value);
})("Fullstack");

/// Callback
function getA() {
     console.log("GetA");
}
function getB(fn) {
     console.log("GetB");
     fn();
}
getB(getA); // A phụ thuộc vào B , B gọi A mới đc gọi => getB getA
// getB(getA())  => getA getB
// tenham() => gọi hàm chủ động
// tenham => gọi hàm bị động => bị phụ thuộc => callback, nhược điểm nếu có tham số => thành chủ động => khắc phục : tách ra 1 hàm mới

function getA1(name) {
     console.log("GetA - " + name);
}
const handleGetA1 = function() {
     getA1("NTienDat")
}
function getB1(fn, value) {
     console.log("GetB");
     fn();
     console.log(value);
}
getB1(handleGetA1, "Sinh Vien");


