/// Setter, getter
// class User {
//      constructor() {
//           this.data = ["Item1", "Item2", "Item3"];
//      }
//      first() {
//           return this.data[0];
//      }
//      latest() {
//           return this.data[this.data.length - 1];
//      }
// }
// const user = new User();
// console.log(user.first());
// console.log(user.latest());
class User {
     constructor() {
          this.data = ["Item1", "Item2", "Item3"];
     }
     get first() {
          return this.data[0];
     }
     get latest() {
          return this.data[this.data.length - 1];
     }
     set latest(value) {
          this.data.push(value);
     }
}
const user = new User();
// console.log(user.first);
user.latest = "User4";
console.log(user.latest);
console.log(user.data); // nó dùng getter, setter nên đừng tưởng là thuộc tính , nó là 1 hàm
