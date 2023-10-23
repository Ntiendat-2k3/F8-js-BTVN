/*
1. Authentication 
- Xác thực
- Biết bạn là ai?

Các loại Authentication
- Session Based Authentication
- Token Based Authentication

2. Authorization
- Ủy quyền
- Cho phép bạn làm gì

Request (Header Token) -> Server -> Response Data
*/
import { client } from "../client.js";
import { requestRefresh } from "../token.js";
client.setUrl("https://api.escuelajs.co/api/v1");
// client.setUrl("https://api.escuelajs.co/api/v1");

// const handleLogin = async (data) => {
//   const { data: tokens } = await client.post("/auth/login", data);
//   console.log(tokens);
// };

// // handleLogin({
// //   email: "john@mail.com",
// //   password: "changeme",
// // });

const app = {
     render: function () {
          const root = document.querySelector("#root");
          if (this.isLogin()) {
               root.innerHTML = `<div class="container py-3">
                                   <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
                                   <hr/>
                                   <ul class="list-unstyled d-flex gap-3 profile">
                                        <li>Chào bạn: <b class="name">Loading...</b></li>
                                        <li><a href="#" class="logout">Đăng xuất</a></li>
                                   </ul>
                              </div>`;
               const profileName = document.querySelector(".profile .name");
               this.getProfile(profileName);
               this.eventLogout();
          } else {
               root.innerHTML = `<div class="container py-3">
                                   <div class="row justify-content-center">
                                   <div class="col-7">
                                        <h2 class="text-center">Đăng nhập</h2>
                                        <form class="login">
                                             <div class="mb-3">
                                                  <label for="">Email</label>
                                                  <input type="email" class="form-control email" placeholder="Email...">
                                             </div>
                                             <div class="mb-3">
                                                  <label for="">Mật khẩu</label>
                                                  <input type="password" class="form-control password" placeholder="Mật khẩu...">
                                             </div>
                                             <div class="d-grid">
                                                  <button type="submit" class="btn btn-primary">Đăng nhập</button>
                                             </div>
                                        </form>
                                        <div class="msg text-danger"></div>
                                   </div>
                                   </div>
                              </div>`;
               this.eventLogin();
          }
     },
     isLogin: function () {
          if (localStorage.getItem("login_tokens")) {
               return true;
          }
          return false;
     },
     handleLogin: async function (data, msg) {
          msg.innerText = "";
          this.addLoading();
          const { data: tokens, response } = await client.post("/auth/login", data);
          this.removeLoading();
          if (!response.ok) {
               msg.innerText = "Email hoặc mật khẩu không chính xác";
          } else {
               //Nếu thành công -> Lưu token vào Storage
               localStorage.setItem("login_tokens", JSON.stringify(tokens));
               this.render();
          }
     },
     getProfile: async function (el) {
          let loginTokens = localStorage.getItem("login_tokens");
          loginTokens = JSON.parse(loginTokens);

          const { access_token: accessToken, refresh_token: refreshToken } = loginTokens;

          //Thêm token vào request header
          client.setToken(accessToken);
          const { response, data } = await client.get("/auth/profile");

          if (response.ok) {
               //Token hợp lệ
               el.innerText = data.name;
          } else {
               // Gọi requestRefresh token
               //Xử lý logout
               const newToken = await requestRefresh(refreshToken);
               if (!newToken) {
                    this.handleLogout();
               } else {
                    // Cập nhật token mới vào localStorage
                    localStorage.setItem("login_tokens", JSON.stringify(newToken));
                    // render 
                    this.render();
               }
          }
     },
     handleLogout: function () {
          localStorage.removeItem("login_tokens");
          this.render();
     },
     addLoading: function () {
          const form = document.querySelector(".login");
          const btn = form.querySelector(".btn");

          btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading`;
          btn.disabled = true;
     },
     removeLoading: function () {
          const form = document.querySelector(".login");
          const btn = form.querySelector(".btn");
          btn.innerHTML = `Đăng nhập`;
          btn.disabled = false;
     },
     eventLogin: function () {
          const form = document.querySelector(".login");
          const msg = document.querySelector(".msg");
          form.addEventListener("submit", (e) => {
               e.preventDefault();
               const emailEl = e.target.querySelector(".email");
               const passwordEl = e.target.querySelector(".password");
               const email = emailEl.value;
               const password = passwordEl.value;
               this.handleLogin({ email, password }, msg);
          });
     },
     eventLogout: function () {
          const logout = document.querySelector(".profile .logout");
          logout.addEventListener("click", (e) => {
               e.preventDefault();
               this.handleLogout();
          });
     },
};

app.render();

/**
 * accessToken => Lấy data
 * refreshToken => Cấp lại accessToken mới
 */
