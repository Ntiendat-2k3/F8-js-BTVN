var a = ["Hoang An", "hoangan@gmail.com"];
var b = a.map((item) => item);
// var b = [...a]
// var b = JSON.parse(JSON.stringify(a))
b[0] = "Hoang An F8";
console.log(a);
console.log(b);

/// Optional chaining (?.)
var a = {};
console.log(a?.name);

var fullname = ["abc"];
// if (fullname && fullname.length) {
//      console.log("ok");
// }
if (fullname?.length) {
     console.log("ok");
}

/// Optional chaining với phương thức
var a = {};
console.log(a.getName?.());

var fullname2 = ["An"];
if (fullname2?.length) {
     fullname2.forEach?.((item) => {
          console.log(item);
     });
}

/// BT
var users = ["Item 1", "Item 2", "Item 3", "Item 4"];

//: Xây dựng phương thức map2
Array.prototype.map2 = function (callback) {
     let result = [];
     for (let i = 0; i < this.length; i++) {
          result.push(callback(this[i], i));
     }
     return result;
};
var result = users.map2((user, index) => {
     return `<h3>${user}</h3> - ${index}`;
});
console.log(result);

//: Xây dựng phương thức forEach 




