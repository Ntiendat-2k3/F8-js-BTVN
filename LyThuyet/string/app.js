console.log("====================================");
console.log(String);
console.log("====================================");
console.log(String.prototype);
var fullname = "NTienDat";
console.log(fullname.length);
console.log(typeof fullname);

/// Các phương thức xử lý chuỗi
var str = "Xin chao F8";
// length => lấy độ dài chuỗi
console.log(str.length); // 11

// charAt(index) => lấy ký tự của chuỗi theo index (index start = 0)
console.log(str.charAt(1)); // i
console.log(str[1]); // i

// charCodeAt(index) => lấy mã ASCII của ký tự theo index
console.log(str.charCodeAt(1)); // 105

// concat(chuoi1, chuoi2, ...) => nối chuỗi
console.log(str.concat("a", "b", "c")); // Xin chao F8abc

// indexOf(sub, start_position) => Tìm vị trí xuất hiện "đầu tiên" của chuỗi con trong chuỗi cha , trả về index , nếu không tìm thấy trả về -1
console.log(str.indexOf("F8")); // 9

// lastIndexOf(sub) => Tìm vị trí cuối
console.log(str.lastIndexOf("chao")); // 4

// includes(sub) => Tìm chuỗi con trong chuỗi cha , trả về true, false
console.log(str.includes("F8")); // true

// slice(start, end) => cắt chuỗi từ chuỗi cha từ start -> end
console.log(str.slice(1, 3)); // in
console.log(str.slice(1)); // in chao F8
console.log(str.slice(-4)); // o F8

// replace(search, width) => thay thế chuỗi
console.log(str.replace("F8", "F88")); // Xin chao F88
//! => Hàm này hỗ trợ thay thế bằng biểu thư chính quy (Regex)
//: Ví dụ: Thay thế chữ số sau chữ f thành dấu *
var pattern = /F\d+/g;
console.log(str.replace(pattern, "f*")); // Xin chao f*

// replaceAll(search, width) => thay thế tất cả
console.log(str.replaceAll("F8", "f8")); // Xin chao f8

/// split() => tách chuỗi thành mảng
console.log(str.split(" ")); // (3) ['Xin', 'chao', 'F8']

// trim() => Xóa khoảng trắng đầu và cuối chuỗi
console.log("     NTienDat ".trim()); // NTienDat
// trimStart() => Xóa khoảng trắng đầu
// trimEnd() => Xóa khoảng trắng cuối

// match() => Cắt chuỗi dựa vào Regex
var content =
     "pack 0123456789 environment horn attempt follow know original brain airplane essential represent firm triangle sad notice either complete +84123456789 individual badly born wore found seems cap";
var pattern1 = /(0|\+84)\d{9}/g;
var phones = content.match(pattern1);
console.log(phones); // (2) ['0123456789', '+84123456789']
