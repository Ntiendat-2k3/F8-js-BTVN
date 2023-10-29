// Regular Expression, Regex: Biểu thức chính quy
/**
 * - Các quy tắc dùng để xử lý chuỗi nâng cao
 * - Tạo bởi các ký hiệu đại diện cho các ký tự
 *
 * - Tác dụng:
 *  + So khớp: Kiểm tra chuỗi thỏa mãn điều kiện
 *  + Cắt chuỗi
 *  + Thay thế
 *
 * - Pattern: /regex/modifier/
 *  Các ký hiệu cơ bản:
 *  - string: Khớp 1 chuỗi cố định
 *  ^ : Khớp đầu chuỗi
 *  $ : Khớp cuối chuỗi
 *  [a-z] : Chữ thường
 *  [A-Z] : Chữ Hoa
 *  [0-9] : Số
 *  [charList] : Các ký tự
 * ==> Lưu ý: Các ký hiệu trong cặp ngoặc [] sẽ kết hợp với nhau theo điều kiện hoặc
 *
 * Mặc định các biểu thức sẽ có độ dài = 1
 *
 * CÁc ký hiệu đô dài:
 *  - {min, max} => độ dài từ min -> max
 *  - {value} => Độ dài cố định value
 *  - {min, } => Độ dài >= min
 * Các ký hiệu viết tắt của độ dài:
 *  - {0,} => *
 *  - {1,} => +: lớn hơn 1 ký tự
 *  - {0,1} => ?
 */
// const pattern = /hoangan/;
// const string = "hoangan123";
// console.log(pattern);
// const check = pattern.test(string);
// console.log(check);

// Thực hành: Kiểm tra username hợp lệ
// - Bắt đầu bằng 1 chữ thường
// - có thể chứa: chữ thường, dấu gạch dươi, gạch ngang, số
// - độ dài từ 6 ký tự trở lên
// - nếu gặp các ký tự đặc biệt thuộc biểu thức chính quy, cần thêm ký tự \ phía trước: / [ ] . , + * ? =
/**
 * - Các ký hiệu viết tắt khác:
 *   + \d => [0-9]
 *   + \D => Ngược lại của số
 *   + \s => Khoảng trắng
 *   + \S => Ngược lại của \s
 *   + \w => Đại diện cho: chữ thường, chữa hoa, số, dấu gạch dưới
 *   + \W => Ngược lại của \w
 *
 * Ký hiệu phủ định: ^ (mũ trong)
 * Ký hiệu hoặc: | (nên bọc điều kiện ngoặc trong cặp ngoặc tròn)
 * Ký hiệu đại diện cho tất cả ký tự: .
 */

// const pattern = /^[a-z][a-z0-9-_]{4,}[a-z0-9]$/;
// const string = "hoanganit19";
// const pattern = /^https:\/\/[a-z-_0-9\.]+\.[a-z]{2,}$/;
// const string = "https://fullstack.edu.vn";
// const pattern = /^(http|https):\/\/(www\.)[a-z0-9-_\.]+\.[a-z]{2,}(\/?|\/[a-z0-9-_\.\/+])$/;
// const string = "https://fullstack.edu.vn/khoa-hoc/fullstack-offline";

// const pattern = /^<[a-z\d-]+.*>.+<\/[a-z\d-]+>$/;
// const string = "<a title='Hello F8' href='https://fullstack.edu.vn'>F8</a>";
// const check = pattern.test(string);
// console.log(check);

/// Cắt chuỗi: match()
// const content = `Xin chào, tôi tên là NTienDat, số điện thoại: 0374322747`;
// const pattern = /(0|\+84)\d{9}/g;
// const result = content.match(pattern);
// console.log(result);

/// Capturing Group: Kỹ thuật lấy 1 phần của Regex (Không áp dụng global)
// const content = `Lorem ipsum dolor sit amet ntiendat@gmail.com consectetur adipisicing elit. Reprehenderit fuga voluptatibus iure animi amet sapiente ntd@yahoo.com facere@g.com sed alias deleniti cupiditate, officia possimus quae corrupti eaque architecto porro ipsa sunt consequuntur!`;
// const pattern = /[a-z0-9-_\.]{3,}@[a-z-_\.0-9]+\.[a-z]{2,}/g;
// const emailList = content.match(pattern);
// console.log(emailList);

/// Non-Capturing Group =>  Loại trừ nội dung trong cặp ngoặc tròn ra khỏi kết quả
/// ?:

/// Greedy, Lazy => Chỉ áp dụng với dấu (.)
// const html = `<img width="200" src="https://fullstack.edu.vn/images/images01.png" title="image">`;
// const pattern = /<img.*src="(.?+)"/; // độ dài của .
// const pattern = /<img.*src="(.+?)"/; // lazy
// const result = html.match(pattern);
// console.log(result);

/// Thay thế
let content = `Xin chào, tôi tên là NTienDat, số điện thoại: 0374322747, +8412345678`;
const pattern = /((0|\+84)\d{9})/g;
content = content.replace(pattern, `<a href="tel:$1" data-start="$2">$1</a>`);
console.log(content);

/// NPM - Package 

