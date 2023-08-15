var customers = ["Nguyen Duong", "Tran Xuan Bach", "Ta Hoang An", "Hoang Anh"];
var keyword = "an";
// Tìm trong mảng có chứa tên khách hàng nào chua từ khóa trả về 1 mảng
var newCustomers = customers.filter((customer) => {
     if (customer.includes(keyword)) {
          return true;
     }
});
console.log(newCustomers);

var users = [
     ["Hoang An", "hoangan.web@gmail.com", 31],
     ["Duong", "duong@gmail.com", 19],
     ["Tran Xuan Bach", "bach@gmail.com", 25],
];
var newUser = users.map(user => {
     if (user[1] === "duong@gmail.com") {
          user[2] += 2;
     }
     return user;
})
console.log(newUser);
