// reduce(callback: prevValue, currentValue, index , initialValue)
// Giá trị trả về của reduce là kết quả của lần return cuối cùng trong callback
var numbers = [5, 10, 15, 20, 25];
var result = numbers.reduce((prev, curr) => {
     console.log(prev, curr);
     return curr + prev;
}, 0);
console.log(result);

var arr1 = [5, 2, 1, 9, 8];
var arr2 = [3, 2, 9, 8];
// Tìm phần tử có trong mảng 1 không có trong mảng 2  Output: [5, 1]
// Dùng reduce

const result1 = arr1.reduce((acc, curr) => {
     if (!arr2.includes(curr)) {
          acc.push(curr);
     }
     return acc;
}, []);
console.log(result1)