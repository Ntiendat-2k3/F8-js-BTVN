console.log(Array.prototype);
var users = ["An", "Tam", "Dung", "Hung"];
// 1. fill() => Cập nhật tất cả các phần tử của mảng thành 1 giá trị
// users.fill("F8");
// console.log(users);

// 2. forEach(callback) => Duyệt qua từng phần từ và trả về element, index trong callback
users.forEach((user, index) => {
     console.log(user, index);
});
console.log("======================================");

// 3. map(callback) =>
/* 
- Duyệt qua từng phần tử trong mảng trả về element, index trong callback; 
- "trả về mảng mới" là return của callback; 
- số lượng phần tử của mảng mới = số lượng phần tử của mảng ban đầu 
*/
var newArray = users.map((user, index) => {
     console.log(user, index);
     return `<h3>${user}</h3>`;
});
console.log(newArray);
console.log("======================================");

// 4. some(callback) =>
/*
- trả về true, false 
- trả về true nếu có ít nhất 1 lần lặp return true;
- trả về false nếu tất cả các lần lặp không phải return true
- "Vòng lặp sẽ chạy tới khi nào return true sẽ dừng "
*/
var numbers = [1, 2, 3, 4, 5, 6, 7];
// => Kiếm tra trong mảng có số chẵn không
var check = numbers.some((number) => {
     console.log(number);
     if (number % 2 === 0) {
          return true;
     }
});
console.log(check);

// 5. every(callback) =>
/**
 * - Trả về true, false
 * - Trả về true khi tất cả lần lặp return true
 * - Trả về false nếu ít nhất 1 lần lặp return false
 */
var numbers2 = [2, 4, 6, 8, 1];
var check2 = numbers2.every((number) => {
     if (number % 2 === 0) {
          return true;
     }
});
console.log(check2);

// 6. filter(callback) =>
/**
 * - Trả về mảng mới
 * - Mảng mới chính là phần tử của mảng cũ mà đc return true
 * - Nếu return k phải true, false => Áp dụng truthy, falsy
 */
var newArray = users.filter((user) => {
     if (user === "An" || user === "Hung") {
          return "Đúng";
     }
});
console.log(newArray);

// 7. find(callback) =>
/**
 * - Cách hoạt động giống filter nhưng chỉ trả về phần tử "đầu tiên"
 * - trả về phần tử của mảng chứ không trả về mảng mới
 */

// 8. findLast(callback) =>
/**
 * - Cách hoạt động giống filter nhưng chỉ trả về phần tử "cuối cùng"
 * - trả về phần tử của mảng chứ không trả về mảng mới
 */

// 9. findIndex(callback) =>
/**
 * - Cách hoạt động giống filter nhưng chỉ trả về index "đầu tiên"
 * - trả về index phần tử của mảng chứ không trả về mảng mới
 */

// 10. findLastIndex(callback) =>
/**
 * - Cách hoạt động giống filter nhưng chỉ trả về index "cuối cùng"
 * - trả về index phần tử của mảng chứ không trả về mảng mới
 */

// 11. 