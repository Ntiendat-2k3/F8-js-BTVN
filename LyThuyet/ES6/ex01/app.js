/// Destructuring
/// Object: phải đúng key
const user = {
     name: "NTiendat",
     age: 20,
     address: "Ho Chi Minh",
     "shipper-address": "Ha Noi",
};
// const key = "address";
// const {
//      name,
//      age,
//      email = "ntiendat@gmail.com",
//      "shipper-address": shipperAddress,
//      [key]: address,
// } = user;
// console.log(name, age, email, shipperAddress);

const { name, age, ...rest } = user;
console.log("Rest-Object:", rest);

/// Array: đúng thứ tự , không cần đúng key
const user2 = ["Ntiendat", "ntiendat@gmail.com", 20, "Sinh Vien", { ageO: 20, school: "TLU" }];
// const [username, email, ...rest2] = user2;
// console.log("Array: ", username, email);
// console.log("Rest-Array:", rest2);
const [username, email, ageA, job, { ageO, school }] = user2;
console.log(username, email, ageO, school);

let a = "An";
let b = "Duong";
[a, b] = [b, a];
console.log(a, b);

const users = [
     {
          id: 1,
          name: "Ntiendat",
     },
     {
          id: 2,
          name: "Ntiendat2",
     },
     {
          id: 3,
          name: "Ntiendat3",
     },
];
const getUser = (value) => users.find(({ id }) => id === value);
console.log(getUser(2));

const html = users.map(({ id, name }) => `<h2>${id} - ${name}</h2>`);
document.body.innerHTML = html;

