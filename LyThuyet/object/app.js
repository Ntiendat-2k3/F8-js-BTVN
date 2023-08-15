//# Object
// - Object literal (đối tượng nguyên bản)
// - Function Constructor (Hàm tạo)
// - Thành phần của đối tượng:
//   + Thuộc tính: đặc điểm , tính chất(biến)
//   + Phương thức: hành động(hàm)

// var user = new Object();
// console.log(user);

/// object literal
var user = {
     // key: value
     name: "NTienDat",
     email: "nguyentiendatg2003@gmail.com",
     age: 20,
     getName: function () {
          // return `NTienDat`;
          return this.name;
     },
     getEmail: function () {
          return `
               - Name: ${this.getName()}
          `;
     },
};
//: Thêm key mới cho object
// user.address = "Ha Noi";
user["address"] = "Ha Noi";

//: Sửa giá trị của key trong object
user.name = "NTienDat_2k3";

//: Xóa key trong object
delete user.address;

//: Truy cập key trong object
console.log(user["email"]);

console.log(user);

//: Lấy danh sách key trong object
// for (var key in user) {
//      console.log(key, user[key]);
// }

console.log(Object.keys(user));
Object.keys(user).forEach((key) => {
     console.log(user[key]);
});

//: Kiểm tra 1 biến có phải object hay không
var a = {};
if (a !== null && !Array.isArray(a) && typeof a === "object") {
     console.log("isObject");
}

//:
console.log(user.getName());
console.log(user.getEmail());

var user = {
     name: "NTienDat",
     email: "nguyentiendatg2003@gmail.com",
     jobs: {
          name: "SinhVien",
          school: "W3C",
          student: [
               {
                    id: 1,
                    name: "A",
                    getName: function () {
                         return this.name;
                    },
               },
               {
                    id: 2,
                    name: "B",
               },
               {
                    id: 3,
                    name: "C",
               },
          ],
     },
};
console.log(user.name);
console.log(user.jobs.name);
// console.log(user.jobs['name']);
console.log(user.jobs.student[0].name);
console.log(user.jobs.student[0].getName());


var users = {
     name: "NTienDat", 
     email: "nguyentiendatg2003@gmail.com",
     getInfo: function () {
          return {
               name: "Hoang An F8"
          }
     }
}
console.log(users.getInfo().name);
console.log(users);

//! this lấy object gần nhất