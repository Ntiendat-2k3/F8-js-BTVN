// Bài 1:
var errors = {
     name: {
          required: "Vui lòng nhập họ tên",
          min: "Họ tên phải từ 5 ký tự",
     },
     email: {
          email: "Định dạng email không hợp lệ",
          unique: "Email đã có người sử dụng",
          required: "Vui lòng nhập địa chỉ email",
     },
     password: {
          required: "Vui lòng nhập mật khẩu",
          same: "Mật khẩu phải khớp với mật khẩu nhập lại",
     },
};
function getErrors(field) {
     const getError = errors[field];
     // console.log(getError);
     if (getError) {
          const keys = Object.keys(getError);
          // console.log(keys);
          if (keys.length > 0) {
               return getError[keys[0]];
          }
     }
     return "";
}
console.log(getErrors("name"));
console.log(getErrors("email"));
console.log(getErrors("password"));

// Bài 2:
function Customer(name, age, address) {
     this.name = name;
     this.age = age;
     this.address = address;
}

function createCustomers(customers) {
     const sortedCustomers = customers.sort((a, b) => a.age - b.age);
     const result = sortedCustomers.map((customer) => {
          const names = customer.name.split(" ");
          const lastName = names[names.length - 1];
          const shortName = `${names[0]} ${lastName}`; 

          return {
               ...customer,
               shortName,
          };
     });
     return result;
}
const customers = [
     { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
     { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
     { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];
console.log(createCustomers(customers));

// Bài 3:
function User(name, password, email) {
     this.name = name;
     this.password = password;
     this.email = email;
     this.role = "user";
}
const data = [];
function register(name, password, email) {
     // Kiểm tra thông tin có đầy đủ không
     if (!name || !password || !email) {
          console.log("Thông tin không đầy đủ. Vui lòng nhập đầy đủ thông tin.");
          return;
     }

     // Kiểm tra xem email đã được đăng ký trước đó chưa
     const existingUser = data.find((user) => user.email === email);
     if (existingUser) {
          console.log("Email đã được sử dụng. Vui lòng sử dụng email khác.");
          return;
     }

     const newUser = new User(name, password, email);
     data.push(newUser);
     console.log("Đăng ký thành công!");
     return newUser;
}

function login(email, password) {
     const user = data.find((user) => user.email === email && user.password === password);
     if (user) {
          console.log("Đăng nhập thành công!");
          return user;
     } else {
          console.log("Thông tin đăng nhập không hợp lệ.");
          return null;
     }
}

const dataRegister1 = register("Nguyen Van A", "123456", "nguyenvana@email.com");
const dataRegister2 = register("Nguyen Van B", "1234567", "nguyenvanb@email.com");

const dataLogin = login("nguyenvanb@email.com", "1234567");

console.log("data =", data);
console.log("dataLogin =", dataLogin);


