// Tách phần fetch api => thành obj client
// dễ bảo trì
// => Giải quyết các bài toán phư tạp liên quan đến API trong dự án
// https://cvsy7f-8080.csb.app/posts

import { client } from "./client.js";
import { config } from "./config.js";
const { PAGE_LIMIT } = config;

//  <div class="row g-3">
//       <div class="col-6 col-lg-4">
//            <div class="post-item border p-3">
//                 <h3>
//                      <a href="#" class="text-decoration-none">
//                           Tiêu đề bài viết 1
//                      </a>
//                 </h3>
//                 <p>
//                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus dolorum
//                      perspiciatis inventore rerum reiciendis error id mollitia, deleniti sunt,
//                      necessitatibus laborum voluptatum fugiat suscipit doloremque tenetur vero a!
//                      Nihil, vitae.
//                 </p>
//            </div>
//       </div>

//       <div class="col-6 col-lg-4">
//            <div class="post-item border p-3">
//                 <h3>
//                      <a href="#" class="text-decoration-none">
//                           Tiêu đề bài viết 1
//                      </a>
//                 </h3>
//                 <p>
//                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus dolorum
//                      perspiciatis inventore rerum reiciendis error id mollitia, deleniti sunt,
//                      necessitatibus laborum voluptatum fugiat suscipit doloremque tenetur vero a!
//                      Nihil, vitae.
//                 </p>
//            </div>
//       </div>

//       <div class="col-6 col-lg-4">
//            <div class="post-item border p-3">
//                 <h3>
//                      <a href="#" class="text-decoration-none">
//                           Tiêu đề bài viết 1
//                      </a>
//                 </h3>
//                 <p>
//                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus dolorum
//                      perspiciatis inventore rerum reiciendis error id mollitia, deleniti sunt,
//                      necessitatibus laborum voluptatum fugiat suscipit doloremque tenetur vero a!
//                      Nihil, vitae.
//                 </p>
//            </div>
//       </div>

//       <div class="col-6 col-lg-4">
//            <div class="post-item border p-3">
//                 <h3>
//                      <a href="#" class="text-decoration-none">
//                           Tiêu đề bài viết 1
//                      </a>
//                 </h3>
//                 <p>
//                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus dolorum
//                      perspiciatis inventore rerum reiciendis error id mollitia, deleniti sunt,
//                      necessitatibus laborum voluptatum fugiat suscipit doloremque tenetur vero a!
//                      Nihil, vitae.
//                 </p>
//            </div>
//       </div>
//  </div>;

const render = (posts) => {
     /// Giải quyết vấn đề xss : khi thêm thẻ img, b , u, i không bị thay đổi giao diện (có ng phá)
     const stripHtml = (html) => {
          // const div = document.createElement("div");
          // div.innerHTML = html;
          // return div.textContent;

          // regular expression
          return html.replace(/(<([^>]+)>)/gi, "");
     };
     const postEl = document.querySelector(".posts");
     let postHtml = posts
          .map(
               ({ title, excerpt, content }) => `
          <div class="col-6 col-lg-4">
               <div class="post-item border p-3">
                    <h3>
                         <a href="#" class="text-decoration-none">
                              ${stripHtml(title)}
                         </a>
                    </h3>
                    <p>${stripHtml(excerpt)}</p>
               </div>
          </div>
     `
          )
          .join("");
     postEl.innerHTML = `<div class="row g-3">${postHtml}</div>`;
};
const paginationNav = document.querySelector(".pagination-nav");
const renderPaginate = (totalPages) => {
     paginationNav.innerText = "";
     if (totalPages > 1) {
          paginationNav.innerHTML = `
               <ul class="pagination">
                    ${
                         currentPage > 1
                              ? `<li class="page-item"><a class="page-link page-prev" href="#">Trước</a></li>`
                              : ""
                    }
                    ${[...Array(totalPages).keys()]
                         .map(
                              (index) =>
                                   `<li class="page-item ${
                                        +currentPage === +index + 1 ? "active" : ""
                                   }"><a class="page-link page-number" href="#">${
                                        index + 1
                                   }</a></li>`
                         )
                         .join("")}
                    ${
                         currentPage < totalPages
                              ? `<li class="page-item"><a class="page-link page-next" href="#">Sau</a></li>`
                              : ""
                    }
               </ul>`;
     }
};
const goPage = (page) => {
     currentPage = page;
     getPosts({
          _sort: sort,
          _order: order,
          q: keyword,
          _page: currentPage,
          _limit: PAGE_LIMIT,
     });
};
const getPosts = async (query = {}) => {
     const queryString = new URLSearchParams(query).toString();
     const { data: posts, response } = await client.get("/posts?" + queryString);
     // console.log(queryString);
     // console.log(posts);

     // Tính tổng số trang
     const totalPosts = response.headers.get("x-total-count");
     console.log(totalPosts);
     const totalPages = Math.ceil(totalPosts / PAGE_LIMIT);
     render(posts);
     renderPaginate(totalPages);
};
getPosts({
     _sort: "id",
     _order: "desc",
});

let order = "desc";
let sort = "id";
let keyword = "";
let currentPage = 2;
getPosts({
     _sort: sort,
     _order: order,
     _page: currentPage,
     _limit: PAGE_LIMIT,
});
// Phân trang
// Tổng số trang = Tổng số bài / limit

/// Chức năng tìm kiếm
const searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", function (e) {
     e.preventDefault();
     const keywordEl = e.target.querySelector(".keyword");
     keyword = keywordEl.value;

     getPosts({
          _sort: sort,
          _order: order,
          q: keyword,
          _page: currentPage,
          _limit: PAGE_LIMIT,
     });
     console.log(keyword);
     keywordEl.value = "";
});

/// Chức năng sắp xếp
const sortByEl = document.querySelector(".sort-by");
sortByEl.addEventListener("change", function (e) {
     order = e.target.value;
     getPosts({
          _sort: sort,
          _order: order,
          q: keyword,
          _page: currentPage,
          _limit: PAGE_LIMIT,
     });
});

/// Xử lý chuyển trang
paginationNav.addEventListener("click", (e) => {
     e.preventDefault();
     if (e.target.classList.contains("page-number")) {
          // goi ham
          goPage(+e.target.innerText);
     }
     // prev
     if (e.target.classList.contains("page-prev")) {
          goPage(currentPage - 1);
     }
     // next
     if (e.target.classList.contains("page-next")) {
          goPage(currentPage + 1);
     }
});
