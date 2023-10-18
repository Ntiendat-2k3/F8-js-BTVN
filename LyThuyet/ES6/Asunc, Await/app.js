// Tính tổng thu nhập của tất cả các users trong mảng list
const getUser = (id) => {
     const users = [
          {
               id: 1,
               name: "abc",
               salary: 1000,
          },
          {
               id: 2,
               name: "abc1",
               salary: 2000,
          },
          {
               id: 3,
               name: "abc2",
               salary: 3000,
          },
     ];
     return new Promise((resolve) => {
          setTimeout(() => {
               const user = users.find(({ id: _id }) => {
                    id === _id;
               });
               resolve(user);
          }, 1000);
     });
};
const lists = [1, 2, 3];
// let salary = 0;
// const getSalary = async () => {
//      for (let id of lists) {
//           const user = await getUser(id);
//           salary += user.salary;
//      }
//      console.log(salary);
// };
// getSalary();

// Promise.all() => nhận 1 mảng chứa tất cả các Promise
const request = lists.map((id) => getUser(id));
Promise.all(request).then((users) => {
     console.log(users);
     const salary = users.reduce((total, { salary }) => total + salary, 0);
     console.log(salary);
});


const promise = Promise.resolve("F8");
promise.then((data) => {
     console.log(data);
});
const promise2 = Promise.reject("Network Error");
promise2.catch((err) => {
     console.log(err);
});
