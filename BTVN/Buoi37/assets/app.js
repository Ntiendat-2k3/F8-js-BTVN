import { client } from "./client.js";
import { requestRefresh } from "./token.js";

client.setUrl("https://api-auth-two.vercel.app");

let currentPage = 1;
let isFetching = false;
let hasMore = true;

const toggleClass = (selector, addClass, removeClass) => {
     const element = document.querySelector(selector);
     element.classList.add(addClass);
     element.classList.remove(removeClass);
};

const showLoading = () => (document.getElementById("loading").style.display = "block");
const hideLoading = () => (document.getElementById("loading").style.display = "none");

const changeTime = (timeDifference) => {
     let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
     let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
     let days = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 30);

     if (days > 0 && days < 31) return `${days} ngày`;
     if (days === 0 && hours > 0) return `${hours} giờ` + (minutes > 0 ? ` ${minutes} phút` : "");
     if (days === 0 && hours === 0 && minutes > 0) return `${minutes} phút`;
     if (days === 0 && hours === 0 && minutes === 0) return `vài giây`;
};

const fetchData = async () => {
     showLoading();
     isFetching = true;

     try {
          const { response, data: _data } = await client.get(`/blogs?page=${currentPage}`);
          currentPage++;
          const data = _data.data;

          if (!data) {
               hasMore = false;
               hideLoading();
               return;
          }

          const list = document.querySelector(".block-list");
          const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");

          for (let post of data) {
               const { createdAt } = post;
               const date = new Date(createdAt);
               const timeDifference = new Date().getTime() - date.getTime();
               const timeUp = changeTime(timeDifference);

               const postHTML = `
                    <hr>
                    <div class="container">
                         <div class="row">
                         <div class="col-3">
                              <div>${stripHtml(date.toLocaleDateString())}</div>
                              <div>${stripHtml(date.toLocaleTimeString().slice(0, 5))}</div>
                         </div>
                         <div class="col-9">
                              <h2>${stripHtml(post.userId.name)}</h2>
                              <h4>${stripHtml(post.title)}</h4>
                              <p>${stripHtml(post.content)}</p>
                              <p class="date">${timeUp} trước</p>
                         </div>
                         </div>
                    </div>`;
               list.insertAdjacentHTML("beforeend", postHTML);
          }
          hideLoading();
     } catch {
          hideLoading();
     }
};

const app = {
     render: function () {
          const root = document.querySelector("#root");
          if (this.isLogin()) {
               root.innerHTML = `
                    <h1>Xin chào, [Tên người dùng]!</h1>
                    <button type="submit" class="btn btn-primary" id="logoutBtn">Đăng xuất</button>
                    <div class="block-list"></div>
               `;

               const logoutBtn = document.getElementById("logoutBtn");
               logoutBtn.addEventListener("click", this.handleLogout.bind(this));
          } else {
               root.innerHTML = `
                    <div class="wrapper">
                         <h1>Blogger</h1>    
                         <button type="submit" class="btn btn-primary">Đăng nhập</button>
                    </div>    
                    <div class="block-list"></div>
               `;

               currentPage = 1;
               fetchData();

               const btn = root.querySelector("button");
               btn.addEventListener("click", this.handleLogin.bind(this));
          }

          // Global scroll event listener
          window.addEventListener("scroll", () => {
               if (isFetching || !hasMore) return;
               if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                    fetchData();
               }
          });
     },

     isLogin: function () {
          return localStorage.getItem("login_tokens") !== null;
     },

     handleLogin: async function () {
          const form = document.querySelector(".login");
          const msg = document.querySelector(".msg");

          const emailEl = form.querySelector(".email");
          const passwordEl = form.querySelector(".password");
          const email = emailEl.value;
          const password = passwordEl.value;

          this.addLoading();

          try {
               const { response, data: tokens } = await client.post("/auth/login", {
                    email,
                    password,
               });
               if (!response.ok) {
                    msg.innerText = tokens.message;
               } else {
                    localStorage.setItem("login_tokens", JSON.stringify(tokens));
                    this.render();
               }
          } finally {
               this.removeLoading();
          }
     },

     addLoading: function () {
          const form = document.querySelector(".login");
          const btn = form.querySelector(".btn");
          btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
          btn.disabled = true;
     },

     removeLoading: function () {
          const form = document.querySelector(".login");
          const btn = form.querySelector(".btn");
          btn.innerHTML = `Đăng nhập`;
          btn.disabled = false;
     },

     handleLogout: async function () {
          const tokens = JSON.parse(localStorage.getItem("login_tokens"));
          const refreshToken = tokens ? tokens.refresh_token : null;

          localStorage.removeItem("login_tokens");

          try {
               if (refreshToken) {
                    await client.post("/auth/logout", { refreshToken: refreshToken });
               }
          } catch (error) {
               console.error("Failed to logout:", error.message);
          } finally {
               this.render();
          }
     },

     getToken: function () {
          const tokenString = localStorage.getItem("login_tokens");
          const tokens = tokenString ? JSON.parse(tokenString) : null;

          if (!tokens) return null;

          const now = new Date().getTime();
          if (tokens.access_expiry && now > tokens.access_expiry) {
               return this.refreshAccessToken(tokens.refresh_token);
          }

          return tokens.access_token;
     },

     refreshAccessToken: async function (refreshToken) {
          try {
               const { response, data } = await requestRefresh(refreshToken);
               if (response.ok) {
                    const tokens = {
                         access_token: data.access_token,
                         refresh_token: refreshToken,
                         access_expiry: new Date().getTime() + data.expires_in * 1000,
                    };
                    localStorage.setItem("login_tokens", JSON.stringify(tokens));
                    return data.access_token;
               } else {
                    localStorage.removeItem("login_tokens");
                    app.render();
                    throw new Error(data.message || "Error refreshing token");
               }
          } catch (error) {
               console.error("Failed to refresh access token:", error.message);
               return null;
          }
     },
     // ... (continuation of the app object)

     handleLogin: async function () {
          const form = document.querySelector(".login");
          const msg = document.querySelector(".msg");

          const emailEl = form.querySelector(".email");
          const passwordEl = form.querySelector(".password");
          const email = emailEl.value;
          const password = passwordEl.value;

          this.addLoading();

          try {
               const { response, data: tokens } = await client.post("/auth/login", {
                    email,
                    password,
               });
               if (!response.ok) {
                    msg.innerText = tokens.message;
               } else {
                    localStorage.setItem("login_tokens", JSON.stringify(tokens));
                    this.render();
               }
          } finally {
               this.removeLoading();
          }
     },

     handleRegister: async function () {
          const form = document.querySelector(".register");
          const msg = document.querySelector(".msg");

          const nameEl = form.querySelector(".name");
          const emailEl = form.querySelector(".email");
          const passwordEl = form.querySelector(".password");
          const name = nameEl.value;
          const email = emailEl.value;
          const password = passwordEl.value;

          this.addLoadingRegister();

          try {
               const { response, data } = await client.post("/auth/register", {
                    name,
                    email,
                    password,
               });
               if (!response.ok) {
                    msg.innerText = data.message;
               } else {
                    msg.innerText = "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.";
                    setTimeout(() => {
                         this.render(); // or redirect to login page
                    }, 2000);
               }
          } finally {
               this.removeLoadingRegister();
          }
     },

     handlePost: async function (postData) {
          const token = this.getToken();
          if (!token) {
               console.error("You must be logged in to create a post.");
               return;
          }

          client.setToken(token);
          try {
               const { response, data } = await client.post("/posts", postData);
               if (response.status !== 201) {
                    console.error("Failed to create post.", data);
                    return;
               }
               console.log("Post created successfully!", data);
               return data;
          } catch (error) {
               console.error("An error occurred while creating the post.", error);
          }
     },

     // ... (continuation of the app object)

     addLoadingRegister: function () {
          const form = document.querySelector(".register");
          const btn = form.querySelector(".btn");
          btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Đang đăng ký`;
          btn.disabled = true;
     },

     removeLoadingRegister: function () {
          const form = document.querySelector(".register");
          const btn = form.querySelector(".btn");
          btn.innerHTML = `Đăng kí`;
          btn.disabled = false;
     },

     initEventListeners: function () {
          // Sự kiện submit form đăng nhập
          const loginForm = document.querySelector(".login");
          if (loginForm) {
               loginForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    this.handleLogin();
               });
          }

          // Sự kiện chuyển giữa form đăng nhập và đăng ký
          const registerBtn = document.querySelector(".register-button");
          const loginBtn = document.querySelector(".login-button");
          if (registerBtn) {
               registerBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.renderForm("register");
               });
          }
          if (loginBtn) {
               loginBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.renderForm("login");
               });
          }

          // Sự kiện submit form đăng ký
          const registerForm = document.querySelector(".register");
          if (registerForm) {
               registerForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    this.handleRegister();
               });
          }
     },

     renderForm: function (type = "login") {
          const root = document.querySelector("#root");
          if (type === "login") {
               root.innerHTML = `
            <div class="container py-3">
                 <div class="row justify-content-center">
                      <div class="col-7">
                      <form class="login">
                           <div class="mb-3">
                                <label for="">Email</label>
                                <input
                                     type="email"
                                     class="form-control email"
                                     placeholder="Email..."
                                />
                                </div>
                                <div class="mb-3">
                                <label for="">Mật khẩu</label>
                                <input
                                     type="password"
                                     class="form-control password"
                                     placeholder="Mật khẩu..."
                                />
                                </div>
                                <div class="d-grid">
                                     <button type="submit" class="btn btn-primary">Đăng nhập</button>
                                </div>
                      </form>
                      <div class ="msg text-danger"></div>
                      <div>
                           <span>Tạo tài khoản?</span> <a class="register-button" href="#!">Đăng Ký</a>
                      </div>
                      <a class="default" href="#!">Quay lại trang chủ</a>
                      </div>
                 </div>
            </div>`;

               // Attach event listeners specific to the login form
               const registerBtn = document.querySelector(".register-button");
               registerBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    renderForm("register");
               });
          } else if (type === "register") {
               root.innerHTML = `
            <div class="container py-3">
                 <div class="row justify-content-center">
                      <div class="col-7">
                      <form class="register">
                           <div class="mb-3">
                                <label for="">Tên</label>
                                <input
                                type="text"
                                class="form-control name"
                                placeholder="Name..."
                                />
                           </div>
                                <div class="mb-3">
                                <label for="">Email</label>
                                <input
                                     type="email"
                                     class="form-control email"
                                     placeholder="Email..."
                                />
                                </div>
                                <div class="mb-3">
                                <label for="">Mật khẩu</label>
                                <input
                                     type="password"
                                     class="form-control password"
                                     placeholder="Mật khẩu..."
                                />
                                </div>
                                <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Đăng kí</button>
                                </div>
                      </form>
                      <div class ="msg text-danger"></div>
                      <div>
                           <span>Bạn đã có tài khoản?</span> <a class="login-button" href="#!">Đăng nhập</a>
                      </div>
                      <a class="default" href="#!">Quay lại trang chủ</a>
                      </div>
                 </div>
            </div>`;

               // Attach event listeners specific to the registration form
               const loginBtn = document.querySelector(".login-button");
               loginBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    renderForm("login");
               });
          }
     },
};

app.render();
