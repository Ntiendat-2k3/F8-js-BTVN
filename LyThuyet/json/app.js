/// JSON
// - là chuỗi, tạo từ object của JS
// - Mô tả dữ liệu 1 cách chính xác
// - Dùng để giao tiếp dữ liệu giữa các nền tảng
// - JSON hỗ trợ hầu hết các ngôn ngữ lập trình

/// 2 hàm thg sử dụng xử lý JSON
// - chuyển từ kiểu dữ liệu JS -> JSON : JSON.stringify()
// - chuyển JSON -> JS : JSON.parse()

var users = [
     {
          id: 1,
          name: "Tien Dat",
     },
     {
          id: 2,
          name: "Abc",
     },
];
console.log(users);
var json = JSON.stringify(users);
console.log(json);
