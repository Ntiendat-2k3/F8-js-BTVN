//# API
/**
 * Client <=> Server
 * - Lấy dữ liệu từ Server để trả về Client (Render lên giao diện)
 * - Đẩy dữ liệu từ Client lên Server
 *
 * HTTP Request => Server => HTTP Response
 * API = application programming interface : Giao diện lập trình ứng dụng
 * - Giao tiếp giữa Client với Server
 * - Giao tiếp giữa Server với Server
 * - Giao tiếp giữa phần mềm với hệ điều hành
 * - Giao tiếp giữa chương trình với các hàm trong thư viện / framework
 */

/// WEB API: => Chuẩn thiết kế API => RESTFul API
//: Những qui tắc của chuẩn RESTFul
/**
 * URL: Base Server + resource (resource sẽ có quy tắc đặt tên)
 * Ví dụ: https://api.fullsatck.edu.vn/users
 *
 * - HTTP METHOD: get, post, put, patch, delete
 * - HTTP METHOD + resource => Endpoint
 * Ví dụ: GET /users => lấy danh sách user
 *        POST /users => Thêm mới user
 *        GET /users/{id} => Lấy thông tin 1 user
 *        PUT /users/{id} => Sửa thông tin 1 user
 *
 * Response Code
 * Response Body => Nội dung trả về (Kiểu JSON)
 */

//: Làm thế nào để có Server API
// - Tự viết
// - Sử dụng các dịch vụ Mockup API (Fake API)
// - Sử dụng thư viện Mockup API

//: Làm thế nào để gọi API
// - XMLHttpRequest => Không trả về promise
// - fetch => Trả về promise
// - Thư viện: axios, jquery ajax

const serverApi = "http://localhost:3000";
// fetch(`${serverApi}/users`)
//      .then((response) => {
//           console.log(response);
//           // return response.text();
//           return response.json();
//      })
//      .then((data) => {
//           console.log(data);
//           const body = document.body;
//           body.innerHTML = data.map(({ email }) => `<h2>${email}</h2>`).join("");
//      });
// const getUsers = async () => {
//      const response = await fetch(`${serverApi}/users`);
//      const users = await response.json();
//      console.log(users);
// };
// getUsers();
// const getUser = async (id) => {
//      const response = await fetch(`${serverApi}/users/${id}`);
//      const users = await response.json();
//      console.log(users);
// };
// getUser(1);

/**
 * POST => Thêm mới
 * PUT => Update, ghi đè
 * PATCH => Update , không ghi đè
 * DELETE => Xóa
 */
const postUser = async (data) => {
     // data là object
     /**
      * URL
      * METHOD = POST
      * HEADER: Content-type
      * Body
      */
     const dataEncoded = new URLSearchParams(data).toString();
     const response = await fetch(`${serverApi}/users`, {
          method: "POST",
          headers: {
               // "Content-Type": "application/json",
               "Content-Type": "application/x-www-form-urlencoded",
          },
          // body: JSON.stringify(data),
          body: dataEncoded,
     });
     console.log(response);
};
// postUser({
//      name: "User 4",
//      email: "user4@gmail.com",
// });
const updateUser = async (data, id) => {
     const response = await fetch(`${serverApi}/users/${id}`, {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
     });
     console.log(response);
};
// updateUser(
//      {
//           name: "User 1",
//      },
//      1
// );
const deleteUser = async (id) => {
     const response = await fetch(`${serverApi}/users/${id}`, {
          method: "DELETE",
     });
     console.log(response);
};
deleteUser(1);
