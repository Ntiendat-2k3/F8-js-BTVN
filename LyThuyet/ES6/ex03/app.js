/// Class -> Định nghĩa 1 object
class Person {
     // Phương thức khởi tạo:
     // -> chạy đầu tiên khi object được khởi tạo
     constructor(name, email, age) {
          this.name = "Hoang An";
          this.email = "hoangan@gmail.com";
          this.age = 31;
     }
     getName() {
          console.log(this);
          return this.name;
     }
     getEmail = function () {
          return this.email;
     };
     getAge = () => {
          return this.age;
     };
}
// Tao Object
const person = new Person();
console.log(person);
console.log(person.getName());
console.log(person.getAge());

class Girl extends Person {
     constructor(name, email, age, address) {
          super(name, email, age);
          // console.log(name);
          this.address = address;
     }
     getInfo() {
          return `
               - Name: ${this.getName()}
               - Email: ${this.getEmail()}
               - Age: ${this.getAge()}
               - Address: ${this.address}
          `;
     }
}
const girl = new Girl("Tien Dat", "ntiendat@gmail,com", 20, "Ha Noi"); // bỏ giá trị mặc định của constructor cha
console.log(girl);
console.log(girl.getInfo());

/// CustomElements
customElements.define(
     "hello-f8",
     class extends HTMLElement {
          constructor() {
               super();
          }
          connectedCallback() {
               this.innerText = "Hello F8";
          }
     }
);

/// Static:
class User {
     // Phuong thuc
     constructor() {
          // Thuoc tinh non-static
          /// non-static phu thuoc vao obj
          this.name = "Tien Dat";
          this.email = "ntiendat@gmail.com";
     }
     // Phuong thuc non-static
     getName() {
          console.log(this); //: obj: User {name: 'Tien Dat', email: 'ntiendat@gmail.com'}
          console.log(this.constructor); //: convert class
          console.log(this.constructor.isUser()); // constructor: thuoc tinh
          return this.name;
     }
     // Phuong thuc static
     static isUser() {
          console.log(this); //: class

          const _this = new this();  //: convert obj
          console.log(_this);
          // console.log(_this.getName());
          return "Toi la User";
     }
     // Thuoc tinh static
     static age = 20;
}

console.log(User.isUser());  // Toi la User
console.log(User.age);  // 20
// console.log(User.getName()); => error

const user = new User();
console.log(user.getName()); // Tien Dat
console.log(user.constructor.age); // Tien Dat
