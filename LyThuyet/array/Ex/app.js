// var fullname = "Ta Hoang An";
// console.log(fullname.split(" ").at(fullname.length - 1).join());

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
