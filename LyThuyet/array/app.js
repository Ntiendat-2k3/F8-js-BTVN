// var users = new Array("Nguyen", "Tien", "Dat");
var users = ["Nguyen", "Tien", "Dat"];
console.log(users);
console.log(Array.prototype);
console.log([Array]);

/// Array.tenPhuongThuc();

// Kiểm tra 1 biến có phải mảng hay không
if (Array.isArray(users)) {
     console.log("Đây là mảng");
} else {
     console.log("Không phải mảng");
}

// length => lấy số lượng phàn tử
console.log(users.length);

// Thêm phần tử mới vào mảng
users[3] = "Mai";
users[users.length] = "Ha";
users[users.length] = "Dete";
console.log(users);

// Truy cập vào 1 phần tử
console.log(users[2]);

// Sửa 1 phần tử
users[4] = "Yun";
console.log(users);

// Duyệt mảng
// for (let i = 0; i < users.length; i++) {
//      console.log(users[i]);
// }

// for (var index in users) {
//      console.log(users[index]);
// }

for (var user of users) {
     console.log(user);
}

// Xóa mảng
var indexDelete = 4;
var result = [];
for (var index in users) {
     if (+indexDelete === +index) {
          continue;
     }
     result[result.length] = users[index];
}
console.log(users);
console.log(result);

// at() => truy cập 1 phần tử theo index
console.log(users.at(1));

// concat(arr1, arr2) => nối mảng
console.log(users.concat([1, 2, 3], [4, 5, 6]));
console.log(users.concat("abc"));

// indexOf(value) => Tìm vị trí xuất hiện "đầu tiên" của phần tử trong mảng
console.log(users.indexOf("Nguyen"));

// lastIndexOf(value) => Tìm vị trí xuất hiện "cuối cùng" của phần tử trong mảng
console.log(users.indexOf("Nguyen"));

// includes() => Tìm phần tử trong mảng và trả về true, false
console.log(users.includes("Nguyen"));

// slice(start, end) => Cắt mảng từ start -> end và "trả về 1 mảng"
console.log(users.slice(0, 1));
console.log(users.slice(-2));

// join() => mảng -> chuỗi
console.log(users.join(" | "));

/// Thay đổi mảng ban đầu
// push() => Thêm phần tử vào "cuối" mảng , trả về số lượng phần tử sau khi thêm
var count = users.push("Dung", "Duong");
console.log(users);
console.log(count);

// unshift() => Thêm phần tử vào "đầu" mảng
// pop() => Xóa phần tử cuối mảng và trả về giá trị phần tử vừa xóa
console.log(users.pop());
console.log(users);

// shift() => Xóa phần tử đầu mảng và trả về giá trị phần tử vừa xóa
console.log(users.shift());
console.log(users);

// splice(index, count) => Xóa "count" phần tử từ "index" và trả về mảng xóa
console.log(users.splice(1, 2, "A", "B"));
console.log(users);

// reverse() => đảo ngược mảng
console.log(users.reverse());
console.log(users);

// sort() => Sx mảng theo thứ tự tăng dần
//: với chuỗi
console.log(users.sort());
console.log(users.sort().reverse());
//: với số
var numbers = [1, 7, 5, 3, 2];
console.log(numbers.sort((a, b) => (a - b)));
// a : số sau 
// b: số trc
// SX danh sách khách hàng tăng dần theo tên
var customer = ["Nguyễn Dương", "Trần Xuân Bách", "Đỗ Văn Khoa"];
// customer.sort();
var getLastName = (fullname) => {
     return fullname.split(" ").slice(-1).join();
};
customer.sort((a, b) => {
     console.log(a, b);
     if (getLastName(a) < getLastName(b)) {
          return -1;
     }
});
console.log(customer);