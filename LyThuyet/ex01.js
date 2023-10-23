/// Storage
// Kho lưu trữ dữ liệu tại trình duyệt
// Chỉ lưu trữ text

/*
1. localStorage
- Lưu trữ vô thời hạn
- Dung lượng lưu trữ lớn

2. sessionStorage
- Lưu trữ theo phiên(Tắt trình duyệt tự xóa)
- Dung lượng lưu trữ lớn
-> cả 1,2 đều bị lỗi mật XSS

3. Cookie
- Lưu trữ có thời hạn xác định
- Dung lượng lưu trữ nhỏ
- An toàn hơn localStorage, sessionStorage
-> lỗi bảo mật CSRF(nếu ko xử lý cẩn thận)
*/

/// localStorage
// 1. Thêm dữ liệu
// localStorage.setItem("username", "hoangan");
// 2. Sửa dữ liệu
// localStorage.setItem("username", "NTiendat");
// 3. Đọc dữ liệu
// console.log(localStorage.getItem("username"));
// 4. Xóa dữ liệu
// localStorage.removeItem("username");
// 5. Xóa tất cả
// localStorage.clear();

/// sessionStorage : tương tự localStorage , khác: lưu chỗ khác
// sessionStorage.setItem("username", "abc");

/// Cookie
/**
 * cookie tự động gắn vào request header khi sử dụng trình duyệt
 * Server có thể yêu cầu trình duyệt set cookie thông qua response header set-cookie
 */
// 1. set cookie
// expires: Thời gian sống của cookie
// const expires = new Date("2023-10-20 09:00:00");
// console.log(expires);
// document.cookie = `username=hoangan;expires=${expires}`;
// document.cookie = `email=hoangan@gmail.com;expires=${new Date("2023/10/20 12:00:00")}`;

// 2. Cập nhật lại cookie
// document.cookie = `username=hoanganit19`;

// 3. Xóa cookie
// document.cookie = `email=;expires=${new Date().toUTCString()}`;

// 4. Đọc cookie
// console.log(document.cookie);

document.cookie = "username=hoangan.web;path=/";

// Backend
/// httpOnly: cấm ko cho client lấy cookie(ko lấy đc = JS) , chỉ có server lấy đc 
/// Secure: 
