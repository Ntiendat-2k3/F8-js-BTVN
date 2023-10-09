/// 3 cách xử lý bất động bộ
// - Callback function
// - Promise Object
// - Async Await function

const downloadImage = (callback) => {
     setTimeout(() => {
          console.log("Download Successful");
          if (typeof callback === "function") {
               callback();
          }
     }, 1000);
};
const showMessage = () => {
     console.log("Show image");
};
downloadImage(showMessage);

// Nếu showMessage có tham số thì phải bọc 1 hàm ko tham số để gọi
const downloadImage2 = (callback, ...args) => {
     setTimeout(() => {
          console.log("Download Successful");
          if (typeof callback === "function") {
               callback(...args);
          }
     }, 1000);
};
const showMessage2 = (size) => {
     console.log("Show image" + size);
};
// downloadImage2(() => {
//      showMessage2("big");
// });
downloadImage2(showMessage2, " big");

/// Promise: -> Object đặc biệt để xứ lý các tác vụ bất đồng bộ
/**
 * Promise State :
 * - pending -> Chờ xử lý
 * - fulfilled -> xử lý thành công
 * - reject -> xử lý thất bại
 */
const getUser = () => {
     const users = ["User1", "User2", "User3"];
     return new Promise((resolve, reject) => {
          // resolve, reject : Là function
          setTimeout(() => {
               resolve(users);
               reject("Error");
               // Chỉ chạy 1 trong 2, chạy cái đc gọi trc , giống kiểu return
          }, 1000);
     });
};
// then thì resolve sẽ chạy
getUser()
     .then((users) => {
          // resolve
          console.log(users);
          showMessage();
     })
     .catch((error) => {
          // reject
          console.log(error);
     })
     .finally(() => {
          console.log("Complete");
     });
// Promise Chaining

// BT: Hiển thị A -> B -> C
const getA = () => {
     return new Promise((resolve) => {
          setTimeout(() => {
               console.log("Get A");
          }, 1000);
     });
};
const getB = () => {
     return new Promise((resolve) => {
          setTimeout(() => {
               console.log("Get B");
          }, 500);
     });
};
const getC = () => {
     return new Promise((resolve) => {
          setTimeout(() => {
               console.log("Get C");
          }, 2000);
     });
};
// getA().then((data) => {
//      console.log(data);
//      getB().then((dataB) => {
//           console.log(dataB);
//           getC().then((dataC) => {
//                console.log(dataC);
//           });
//      });
// });
// Callback Hell
// => Promise Chaining
getA()
     .then((data) => {
          console.log(data);
          return getB();
     })
     .then((data) => {
          console.log(data);
          return getC();
     })
     .then((data) => {
          console.log(data);
     });
