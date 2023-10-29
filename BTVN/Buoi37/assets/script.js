import { client } from "./client.js";
import { requestRefresh } from "./token.js";
client.setUrl("https://api-auth-two.vercel.app");

document.addEventListener("DOMContentLoaded", function () {
     // tính time, để render ví dụ như một phút trc,... bla bla
     function calculateTimeAgo(createdAt) {
          const currentDate = new Date();
          const postDate = new Date(createdAt);
          const timeDifference = currentDate - postDate;
          const seconds = Math.floor(timeDifference / 1000);

          if (seconds < 60) {
               if (seconds < 5) {
                    return `Vài giây trước`;
               }
               return `${seconds} giây trước`;
          } else if (seconds < 3600) {
               const minutes = Math.floor(seconds / 60);
               return `${minutes} phút trước`;
          } else if (seconds < 86400) {
               const hours = Math.floor(seconds / 3600);
               return `${hours} giờ trước`;
          } else if (seconds < 604800) {
               const days = Math.floor(seconds / 86400);
               return `${days} ngày trước`;
          } else {
               const weeks = Math.floor(seconds / 604800);
               return `${weeks} tuần trước`;
          }
     }

     const postLoader = {
          currentPage: 1,
          handleScroll: function () {
               const nearBottom =
                    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
               if (nearBottom) {
                    this.loadMorePosts();
               }
          },
          loadMorePosts: async function () {
               this.currentPage++;
               const { data: result, response } = await client.get(
                    `/blogs?limit=10&page=${this.currentPage}`
               );
               if (!response.ok) {
                    console.error("Failed to fetch more blogs:", result.message);
                    return;
               }

               // console.log(result, response);

               // Get the posts container
               const postsContainer = document.getElementById("posts-container");
               // console.log(postsContainer);

               // Display the blogs
               result.data.forEach((blog) => {
                    const postElement = document.createElement("div");
                    postElement.classList.add("post");

                    const timeAgo = calculateTimeAgo(blog.createdAt);

                    let checkContent = blog.content;

                    // sđt
                    const patternPhone = /((0|\+84|84)\d{9})/g;

                    checkContent = checkContent.replace(patternPhone, (number) => {
                         if (number.slice(0, 2) === "84" && number[0] !== "+") {
                              return `<a href="tel:+${number}" target = "_blank" >+${number}</a>`;
                         }
                         return `<a href="tel:${number}" target = "_blank" >${number}</a>`;
                    });

                    // email
                    const patternEmail = /([a-z0-9-_\.]{1,}@([a-z-_\.0-9]+\.[a-z]{2,}))/g;

                    checkContent = checkContent.replace(
                         patternEmail,
                         `<a href = "mailto:$1" target = "_blank">$1</a>`
                    );

                    // Youtube
                    const patternYoutube =
                         /(?:https?:\/\/|\/\/)?(?:www\.)?(youtube\.com(?:\/(?:watch\?v=([A-Za-z0-9_-]{11})|([A-Za-z0-9_-]+))?)?)|youtube\.com/g;

                    checkContent = checkContent.replace(
                         patternYoutube,
                         function (match, p1, p2, p3, p4) {
                              const videoId = p2 || p3 || p4;
                              if (
                                   videoId &&
                                   !/^\/+youtube\.com/.test(match) &&
                                   !match.startsWith("youtube.com")
                              ) {
                                   return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                              } else if (match.includes("youtube.com")) {
                                   let prefixedMatch;
                                   if (match.startsWith("http")) {
                                        prefixedMatch = match;
                                   } else if (match.startsWith("//")) {
                                        prefixedMatch = `https:${match}`;
                                   } else {
                                        prefixedMatch = `https://${match}`;
                                   }
                                   return `<a href="${prefixedMatch}" target="_blank">${match}</a>`;
                              } else {
                                   return `<a href="${match}" target="_blank">${match}</a>`;
                              }
                         }
                    );

                    let formattedContent = checkContent.replace(/(\n)+/g, "<br />");

                    postElement.innerHTML = `
          <h2>${blog.userId.name}</h2>

          <h3>${blog.title}</h3>
          <p>${formattedContent}</p>

          <span class="time-ago">${timeAgo}</span>
          <hr/>
        `;
                    // console.log(postElement);
                    postsContainer.appendChild(postElement);
               });
          },
          setupScrollListener: function () {
               document.addEventListener("scroll", () => this.handleScroll());
          },
     };

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

        <h3 class="mt-4">Đăng bài mới:</h3>
        <form class="post-form">
            <div class="mb-3">
                <label for="title" class="form-label">Tiêu đề</label>
                <input type="text" class="form-control title" id="title-text" required />
            </div>
            <div class="mb-3 contentDay">
                <label for="content" class="form-label">Nội dung</label>
                <textarea class="form-control content" id="content-text" required></textarea>
            </div>
            <div class="container-calendar">
              <div class="calendar">
                <div class="calendar-header">
                  <span class="month-picker" id="month-picker">August</span>
                  <div class="year-picker">
                    <span class="year-change" id="prev-year">
                      <pre><i class="fa-solid fa-angle-left"></i></pre>
                    </span>
                    <span id="year">2023</span>
                    <span class="year-change" id="next-year">
                      <pre><i class="fa-solid fa-angle-right"></i></pre>
                    </span>
                  </div>
                </div>
                <div class="calendar-body">
                  <div class="calendar-week-day">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  <div class="calendar-days"></div>
                </div>
                <div class="month-list"></div>
              </div>
              <input type="text" class="input-calender" value="" />
            </div>
            <button class="btn btn-primary post-btn" type="submit">Đăng bài</button>
        </form>
        <span id="post-msg"></span>
        <div id="posts-container"></div>
      </div>`;
                    const profileName = document.querySelector(".profile .name");
                    this.getProfile(profileName);
                    this.eventLogout();
                    const postForm = document.querySelector(".post-form");
                    const postMsg = document.getElementById("post-msg");

                    const inputCalendar = document.querySelector(".input-calender");
                    const calendar = document.querySelector(".calendar");
                    const monthPicker = document.querySelector(".month-picker");

                    const calendarDays = document.querySelector(".calendar-days"); // lấy ngày
                    const calendarYear = document.querySelector("#year"); // lấy năm

                    inputCalendar.addEventListener("change", function () {
                         const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
                         if (!regex.test(inputCalendar.value)) {
                              const today = new Date();
                              const day = ("0" + today.getDate()).slice(-2);
                              const month = ("0" + (today.getMonth() + 1)).slice(-2);
                              const year = today.getFullYear();

                              inputCalendar.value = `${day}/${month}/${year}`;
                         }
                    });

                    inputCalendar.addEventListener("click", function (e) {
                         e.stopPropagation();
                         calendar.style.visibility = "visible";
                         calendar.style.opacity = "1";
                    });

                    calendar.addEventListener("click", function (e) {
                         e.stopPropagation();
                    });

                    document.addEventListener("click", function () {
                         calendar.style.visibility = "hidden";
                         calendar.style.opacity = "0";
                    });

                    // Hàm kiểm tra năm nhuận
                    const isLeapYear = (year) => {
                         return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
                    };

                    // Hàm lấy 28 hoặc 29 ngày
                    const getFebruary = (year) => {
                         return isLeapYear(year) ? 29 : 28;
                    };

                    // Mảng về tháng
                    let months = [
                         "January",
                         "February",
                         "March",
                         "April",
                         "May",
                         "June",
                         "July",
                         "August",
                         "September",
                         "October",
                         "November",
                         "December",
                    ];

                    // Mảng về số ngày trong tháng
                    let days_of_month = [
                         31,
                         getFebruary(2023),
                         31,
                         30,
                         31,
                         30,
                         31,
                         31,
                         30,
                         31,
                         30,
                         31,
                    ];

                    // Mảng về năm
                    let years = [
                         2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029,
                    ];

                    let curDate = new Date();
                    let getMonth = curDate.getMonth(); // lấy chỉ số của tháng hiện tại
                    let getYear = curDate.getFullYear(); // lấy năm hiện tại
                    // console.log(getMonth);
                    // console.log(getYear);

                    // let firstDayOfMonth = new Date(2023, 9, 1);
                    // console.log(firstDayOfMonth.getDay());

                    const createCalendar = (month, year) => {
                         days_of_month[1] = getFebruary(year);
                         let curMonth = `${months[month]}`;
                         monthPicker.innerHTML = curMonth;
                         calendarYear.innerHTML = year;

                         // Xóa tất cả các ngày cũ trước khi render lại
                         calendarDays.innerHTML = "";

                         // lấy ngày đầu tiên trong tháng
                         let firstDayOfMonth = new Date(year, month, 1);

                         // Số ô trống trước ngày đầu tiên của tháng
                         let emptyCellsBeforeFirstDay = firstDayOfMonth.getDay();

                         // Tạo các ô trống trước ngày đầu tiên của tháng
                         for (let i = 0; i < emptyCellsBeforeFirstDay; i++) {
                              let emptyDay = document.createElement("div");
                              calendarDays.appendChild(emptyDay);
                         }

                         let today = new Date();
                         today.setHours(0, 0, 0, 0);

                         // render ngày
                         for (let i = 1; i <= days_of_month[month]; i++) {
                              let dayElement = document.createElement("div");
                              dayElement.classList.add("calendar-day-hover");
                              dayElement.innerHTML = i;
                              dayElement.innerHTML += `<span></span>
                              <span></span>
                              <span></span>
                              <span></span>`;

                              let currentDate = new Date(year, month, i);
                              if (currentDate < today) {
                                   dayElement.classList.add("disabled");
                              } else if (
                                   i === today.getDate() &&
                                   year === today.getFullYear() &&
                                   month === today.getMonth()
                              ) {
                                   dayElement.classList.add("curr-date");
                              }

                              calendarDays.appendChild(dayElement);
                         }
                         assignClickEvent();
                    };

                    createCalendar(getMonth, getYear);

                    function assignClickEvent() {
                         const dayClick = document.querySelectorAll(".calendar-day-hover");

                         dayClick.forEach((item, index) => {
                              item.addEventListener("click", function () {
                                   dayClick.forEach((day) => {
                                        day.classList.remove("active");
                                        day.style.backgroundColor = "";
                                        day.style.borderRadius = "";
                                   });

                                   item.classList.add("active");

                                   // Lấy ngày đã chọn
                                   const selectedDay = index + 1;

                                   inputCalendar.value = `${selectedDay}/${
                                        getMonth + 1
                                   }/${getYear}`;

                                   // Ẩn lịch sau khi chọn
                                   calendar.style.visibility = "hidden";
                                   calendar.style.opacity = "0";
                              });
                         });

                         dayClick.forEach((item) => {
                              // Rê chuột vào phần tử
                              item.addEventListener("mouseenter", function () {
                                   this.classList.add("day-hover");
                              });

                              // Rê chuột rời khỏi phần tử
                              item.addEventListener("mouseleave", function () {
                                   this.classList.remove("day-hover");
                              });
                         });
                    }

                    const prevYear = document.querySelector("#prev-year");
                    const nextYear = document.querySelector("#next-year");

                    prevYear.addEventListener("click", function () {
                         --getYear;
                         createCalendar(getMonth, getYear);
                         assignClickEvent();
                    });

                    nextYear.addEventListener("click", function () {
                         ++getYear;
                         createCalendar(getMonth, getYear);
                         assignClickEvent();
                    });

                    let monthList = calendar.querySelector(".month-list");

                    months.forEach((n, index) => {
                         let month = document.createElement("div");
                         month.innerHTML = `<div data-month="${index}">${n}</div>`;
                         let manyMonth = month.querySelector("div");
                         manyMonth.addEventListener("click", function () {
                              monthList.classList.remove("show");
                              getMonth = index;
                              createCalendar(getMonth, getYear);
                         });
                         monthList.appendChild(month);
                    });

                    monthPicker.addEventListener("click", function () {
                         monthList.classList.add("show");
                    });

                    let dateTimeElementAdded = false;
                    if (postForm) {
                         postForm.addEventListener("submit", (e) => {
                              e.preventDefault();
                              const titleEl = postForm.querySelector("#title-text");
                              const contentEl = postForm.querySelector("#content-text");
                              const title = titleEl.value;
                              const content = contentEl.value;

                              let today = new Date();
                              today.setHours(0, 0, 0, 0);

                              let dateTimeInput = document.querySelector(".input-calender").value;

                              const [day, month, year] = dateTimeInput.split("/");
                              const correctedDate = `${month}/${day}/${year}`;
                              const dateTime = new Date(correctedDate);
                              const selectedDate = new Date(correctedDate);
                              selectedDate.setHours(0, 0, 0, 0);

                              const differenceInTime = dateTime.getTime() - today.getTime();
                              const differenceInDays = differenceInTime / (1000 * 3600 * 24);

                              let timeFrameMessage;
                              if (differenceInDays < 7) {
                                   timeFrameMessage = `${differenceInDays} ngày tới`;
                              } else if (differenceInDays < 30) {
                                   const weeks = Math.floor(differenceInDays / 7);
                                   timeFrameMessage = `${weeks} tuần tới`;
                              } else if (differenceInDays < 365) {
                                   const months = Math.floor(differenceInDays / 30);
                                   timeFrameMessage = `${months} tháng tới`;
                              } else {
                                   const years = Math.floor(differenceInDays / 365);
                                   timeFrameMessage = `${years} năm tới`;
                              }

                              const daysOfWeek = [
                                   "Chủ Nhật",
                                   "Thứ 2",
                                   "Thứ 3",
                                   "Thứ 4",
                                   "Thứ 5",
                                   "Thứ 6",
                                   "Thứ 7",
                              ];

                              const formattedDateTime = `Bài viết của bạn sẽ được đăng vào: ${dateTime.getHours()} giờ, ${
                                   daysOfWeek[dateTime.getDay()]
                              }, ngày ${dateTime.getDate()}, ${timeFrameMessage}, lúc ${dateTime.getHours()} giờ, ${dateTime.getMinutes()} phút`;

                              const contentDayElement = document.querySelector(".contentDay");

                              if (!dateTimeElementAdded) {
                                   // Kiểm tra xem dateTimeElement đã được thêm chưa
                                   const dateTimeElement = document.createElement("div");
                                   dateTimeElement.innerHTML = `<p>${formattedDateTime}</p>`;
                                   contentDayElement.appendChild(dateTimeElement);
                                   dateTimeElementAdded = true; // Cập nhật trạng thái dateTimeElement đã được thêm
                              } else {
                                   // Nếu dateTimeElement đã được thêm, cập nhật nội dung của nó
                                   const dateTimeElement = contentDayElement.querySelector("div");
                                   dateTimeElement.innerHTML = `<p>${formattedDateTime}</p>`;
                              }

                              // this.handlePost({ title, content }, postMsg);

                              if (selectedDate < today) {
                                   setTimeout(() => {
                                        // Xóa giá trị của các trường input sau khi đăng bài
                                        titleEl.value = "";
                                        contentEl.value = "";
                                        document.querySelector(".input-calender").value = "";
                                        dateTimeElement.innerHTML = "";
                                   }, 1000);
                                   const postMsg = document.querySelector("#post-msg");
                                   postMsg.textContent = "Hãy chọn ngày hiện tại hoặc tương lai";
                              } else {
                                   if (dateTimeInput) {
                                        return;
                                   } else {
                                        const dateTimeElement =
                                             contentDayElement.querySelector("div");
                                        dateTimeElement.innerHTML = "";

                                        this.handlePost({ title, content }, postMsg).then(() => {
                                             setTimeout(() => {
                                                  // Xóa giá trị của các trường input sau khi đăng bài
                                                  titleEl.value = "";
                                                  contentEl.value = "";
                                                  document.querySelector(".input-calender").value =
                                                       "";
                                                  dateTimeElement.innerHTML = "";
                                             }, 1000);
                                        });
                                   }
                              }

                              // this.handlePost({ title, content }, postMsg).then(() => {
                              //   setTimeout(() => {
                              //     // Xóa giá trị của các trường input sau khi đăng bài
                              //     titleEl.value = "";
                              //     contentEl.value = "";
                              //     document.querySelector(".input-calender").value = "";
                              //     dateTimeElement.innerHTML = "";
                              //   }, 1000);
                              // });
                         });
                    }

                    postLoader.setupScrollListener();
                    postLoader.loadMorePosts();
               } else {
                    root.innerHTML = `
            <div class="container">
                <h1 class="initial-title">Blogger</h1>
                <button class="btn btn-primary initial-sign-in" type="button">Sign in</button>
                <div id="posts-container"></div>

                <div class="auth-form hidden">
                <h2 class="text-center form-title">Đăng nhập</h2>
                    <form class="auth-register">
                        <div class="mb-3 name-field hidden">
                            <label for="name" class="form-label">Tên</label>
                            <input type="text" class="form-control name" name="name" id="name" placeholder="Tên" required />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control email" name="email" id="email" placeholder="Email" required />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Mật khẩu</label>
                            <input type="password" class="form-control password" name="password" id="password" placeholder="Mật khẩu" required />
                        </div>
                            <button class="btn btn-success" type="submit" style="margin-right: 5px;">Confirm</button>

                      </form>
                    <form class="auth-login">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control email" id="email" placeholder="Email" required />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Mật khẩu</label>
                            <input type="password" class="form-control password" id="password" placeholder="Mật khẩu" required />
                        </div>
                            <button class="btn btn-success" type="submit" style="margin-right: 5px;">Confirm</button>

                    </form>
                        <div class="switch-form-buttons mb-3 mt-3">
                            <button class="btn btn-primary sign-in" style="margin-right: 5px;">Sign in</button>
                            <button class="btn btn-secondary sign-up" style="margin-left: 5px;">Sign up</button>
                        </div>
                        <span id="msg"></span>
                        <a href= "./index.html" class = "fs-3" >Go home</a>
                </div>
            </div>`;
                    const initialSignInButton = document.querySelector(".initial-sign-in");
                    const authForm = document.querySelector(".auth-form");
                    const signUpButton = document.querySelector(".sign-up");
                    const signInButton = document.querySelector(".sign-in");
                    const nameField = document.querySelector(".name-field");
                    const nameInput = document.querySelector("#name");
                    const emailInput = document.querySelector("#email");
                    const passwordInput = document.querySelector("#password");
                    const formTitle = document.querySelector(".form-title");
                    const initialTitle = document.querySelector(".initial-title");
                    const formRegister = document.querySelector("form.auth-register");
                    const formLogin = document.querySelector("form.auth-login");
                    const msg = document.querySelector("#msg");
                    formRegister.style.display = "none";
                    formRegister.addEventListener("submit", (e) => {
                         e.preventDefault();

                         const name = e.target.name.value;
                         const email = e.target.email.value;
                         const password = e.target.password.value;
                         if (name && email && password) {
                              this.handleRegister({ name, email, password }, msg);
                         } else {
                              msg.innerText = "Vui lòng nhập đầy đủ thông tin";
                         }
                    });
                    formLogin.addEventListener("submit", (e) => {
                         e.preventDefault();

                         const email = e.target.email.value;
                         const password = e.target.password.value;
                         if (email && password) {
                              this.handleLogin({ email, password }, msg);
                         } else {
                              msg.innerText = "Vui lòng nhập đầy đủ thông tin";
                         }
                    });
                    initialSignInButton.addEventListener("click", () => {
                         initialTitle.style.display = "none";
                         initialSignInButton.style.display = "none";
                         authForm.classList.remove("hidden");
                         const postsContainer = document.getElementById("posts-container");

                         postsContainer.classList.add("hidden");
                    });

                    signInButton.addEventListener("click", () => {
                         nameField.classList.add("hidden");
                         formTitle.innerText = "Đăng nhập";
                         emailInput.value = "";
                         passwordInput.value = "";
                         nameInput.value = "";
                    });

                    signUpButton.addEventListener("click", () => {
                         nameField.classList.remove("hidden");
                         formTitle.innerText = "Đăng ký";
                         emailInput.value = "";
                         passwordInput.value = "";
                         formRegister.style.display = "block";
                         formLogin.style.display = "none";
                    });
                    postLoader.setupScrollListener();
                    postLoader.loadMorePosts();
               }
          },
          // isLogin: function () {
          //   if (localStorage.getItem("accessToken")) {
          //     return true;
          //   }
          //   return false;
          // },
          // handleLogin: async function (data, msg) {
          //   msg.innerText = "";
          //   const { data: result, response } = await client.post("/auth/login", data);
          //   if (!response.ok) {
          //     msg.innerText = result.message;
          //   } else {
          //     msg.innerText = result.message;
          //     localStorage.setItem("accessToken", result.data.accessToken);
          //     localStorage.setItem("refreshToken", result.data.refreshToken);
          //   }
          // },

          handleLogin: async function (data, msg) {
               msg.innerText = "";
               const { data: result, response } = await client.post("/auth/login", data);
               if (!response.ok) {
                    msg.innerText = result.message;
               } else {
                    msg.innerText = result.message;
                    localStorage.setItem("login_tokens", JSON.stringify(result.data));
                    this.render();
               }
          },

          isLogin: function () {
               return localStorage.getItem("login_tokens");
          },

          getProfile: async function (el) {
               let loginTokens = localStorage.getItem("login_tokens");
               if (!loginTokens) {
                    this.handleLogout();
                    return;
               }
               loginTokens = JSON.parse(loginTokens);

               const { accessToken, refreshToken } = loginTokens;

               // Thêm token vào request header
               // client.setToken(accessToken);
               const { response, data } = await client.get("/users/profile", accessToken);

               if (response.ok) {
                    // Token hợp lệ
                    el.innerText = data.data.name;
               } else {
                    console.error("Error fetching profile:", data);

                    // Gọi request refresh token
                    const newToken = await requestRefresh(refreshToken);
                    // Không lấy được token mới -> Đăng xuất
                    if (!newToken) {
                         // Xử lý logout
                         this.handleLogout();
                    } else {
                         // Cập nhật token mới vào localStorage
                         localStorage.setItem("login_tokens", JSON.stringify(newToken));
                         // Render
                         this.render();
                    }
               }
          },

          handleLogout: function () {
               localStorage.removeItem("login_tokens");
               this.render();
               // cần post thêm lên /logout đó nhé
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

          handleRegister: async function (data, msg) {
               msg.innerText = "";
               // this.addLoading();
               const { data: result, response } = await client.post("/auth/register", data);
               if (response.ok) {
                    msg.innerText = result.message;
               } else {
                    msg.innerText = result.message;
               }
               // this.removeLoading();
               // if (!response.ok) {
               //   msg.innerText = "Có lỗi xảy ra. Vui lòng thử lại.";
               // } else {
               //   // Sau khi đăng ký thành công, tự động đăng nhập
               //   this.handleLogin(data, msg);
               // }
          },

          handlePost: async function (data, msg) {
               // const tokens = JSON.parse(localStorage.getItem("login_tokens"));
               let loginTokens = localStorage.getItem("login_tokens");
               loginTokens = JSON.parse(loginTokens);

               const { accessToken, refreshToken } = loginTokens;

               client.setToken(accessToken);
               const { data: result, response } = await client.post("/blogs", data);
               if (!response.ok) {
                    msg.innerText = "Có lỗi xảy ra khi đăng bài.";
               } else {
                    msg.innerText = "Đăng bài thành công!";

                    // Tạo phần tử HTML mới để chứa bài đăng
                    const postElement = document.createElement("div");
                    postElement.classList.add("post");
                    const timeAgo = calculateTimeAgo(result.data.createdAt);

                    let checkContent = result.data.content;
                    // sđt
                    const patternPhone = /((0|\+84|84)\d{9})/g;

                    // const checkSđt = checkContent.match(patternPhone);

                    // console.log(checkSđt);

                    checkContent = checkContent.replace(patternPhone, (number) => {
                         if (number.slice(0, 2) === "84" && number[0] !== "+") {
                              return `<a href="tel:+${number}" target = "_blank" >+${number}</a>`;
                         }
                         return `<a href="tel:${number}" target = "_blank" >${number}</a>`;
                    });

                    // email
                    const patternEmail = /([a-z0-9-_\.]{1,}@([a-z-_\.0-9]+\.[a-z]{2,}))/g;

                    checkContent = checkContent.replace(
                         patternEmail,
                         `<a href = "mailto:$1" target = "_blank">$1</a>`
                    );

                    // Youtube
                    const patternYoutube =
                         /(?:https?:\/\/|\/\/)?(?:www\.)?(youtube\.com(?:\/(?:watch\?v=([A-Za-z0-9_-]{11})|([A-Za-z0-9_-]+))?)?)|youtube\.com/g;

                    checkContent = checkContent.replace(
                         patternYoutube,
                         function (match, p1, p2, p3, p4) {
                              const videoId = p2 || p3 || p4;
                              if (
                                   videoId &&
                                   !/^\/+youtube\.com/.test(match) &&
                                   !match.startsWith("youtube.com")
                              ) {
                                   return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                              } else if (match.includes("youtube.com")) {
                                   let prefixedMatch;
                                   if (match.startsWith("http")) {
                                        prefixedMatch = match;
                                   } else if (match.startsWith("//")) {
                                        prefixedMatch = `https:${match}`;
                                   } else {
                                        prefixedMatch = `https://${match}`;
                                   }
                                   return `<a href="${prefixedMatch}" target="_blank">${match}</a>`;
                              } else {
                                   return `<a href="${match}" target="_blank">${match}</a>`;
                              }
                         }
                    );

                    // result.data.content = result.data.content.replace(
                    //   patternPhone,
                    //   `<a href = "tel:$1">$1</a>`
                    // );
                    let formattedContent = checkContent.replace(/(\n)+/g, "<br />");
                    postElement.innerHTML = `
            <h2>${result.data.userId.name}</h2>
            <h3>${result.data.title}</h3>
            <p>${formattedContent}</p>
            <span class="time-ago">${timeAgo}</span>
            <hr/>
        `;

                    console.log(result);
                    // console.log(postElement);

                    // Thêm phần tử HTML mới vào container chứa bài đăng
                    const postsContainer = document.getElementById("posts-container");
                    // postsContainer.appendChild(postElement);
                    // console.log(postsContainer.innerHTML);
                    if (postsContainer.firstChild) {
                         // console.log(postsContainer.firstChild);
                         postsContainer.insertBefore(postElement, postsContainer.firstChild);
                    } else {
                         postsContainer.appendChild(postElement);
                    }
               }
          },

          eventLogin: function () {
               const form = document.querySelector(".login");
               if (form) {
                    const msg = document.querySelector(".msg");
                    form.addEventListener("submit", (e) => {
                         e.preventDefault();
                         const emailEl = e.target.querySelector(".email");
                         const passwordEl = e.target.querySelector(".password");
                         const email = emailEl.value;
                         const password = passwordEl.value;
                         this.handleLogin({ email, password }, msg);
                    });
               }
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
});
