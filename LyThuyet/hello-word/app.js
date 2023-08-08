// ******************************* Variables *********************************** //
const course = "JS",
     price = "500$";
console.log(course + ": " + price);

const welcome = `<h2>Xin chao F8</h2>`;
console.log(welcome);
document.write(welcome);

const text = "Xin chao F8";
console.log(text.split(" ").reverse().join(" ").toUpperCase());

const as = `${text} \`ABC\` `;
console.log(as);

// ******************************* Operators *********************************** //
/// 1. Toan tu so hoc: +, -, *, /, %, **
// ++, -- : phép tăng giảm
// parseInt(), + => ép kiểu
var count = 1;
count++; // count = count + 1
++count; // count = count + 1
console.log(count);

/// 2. Toan tu logic: >, <, >=, <=, ==, ===, !=, !==
console.log("10" == 10);
console.log(+"10" === 10);

/// 3. Toan tu gan: (=)
var concat = "Hoc lap trinh tai: ";
console.log((concat += "F8"));

/// 4. Toan tu ly luan: &&, ||, !
var cmp = 10;
console.log(!(cmp >= 5) && cmp <= 20);

/// 5. Toan tu 3 ngoi
//  bieu thuc ? gtridung : gtrisai
console.log(cmp >= 20 ? "Dung" : "Sai");
document.write(cmp >= 20 ? "Dung" : "Sai");
document.write(`${cmp >= 20 ? "Dung" : "Sai"}`);

/// 6. Toan tu nullish (??)
// var _a = "F8";
// var _b = a ?? "F8";  // check !== null && !== undefined
// console.log(_b);

// Chuyen toan tu nullish thanh toan tu 3 ngoi
var u = undefined;
// var g = u ?? "F8"
var g = u !== undefined && u !== null ? u : "F8";
console.log(g);

/// 6. Boolean
// Falsy: 0, "", false, undefined, null ,NaN
// Truthy: còn lại

/// 7. Toan tu &&
console.log(undefined && "F8");
console.log("Hoang An" && "F8");

//# Câu lệnh rẽ nhánh
/// if...else
/// switch case
var action = "add";
switch (action) {
     case "add":
          console.log("Add");
          break;
     case "delete":
          console.log("Delete");
          break;

     default:
          console.log("Danh sach");
          break;
}

var action = "add";
if (action === "add" || action === "create" || action === "insert") {
     console.log("Them");
} else if (action === "edit" || action === "update") {
     console.log("Sua");
} else if (action === "delete" || action === "remove" || action === "destroy") {
     console.log("Delete");
} else {
     console.log("Danh sach");
}

var month = 11;
prompt("Moi nhap thang: ", month);
if (month % 1 === 0 && month >= 1 && month <= 12) {
     switch (+month) {
          case 2:
               alert("28 ngay");
               break;
          case 4:
          case 6:
          case 9:
          case 11:
               alert("30 ngay");
               break;
          default:
               alert("31 ngay");
               break;
     }
}
