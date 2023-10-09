// Tách phần fetch api => thành obj client
// dễ bảo trì
// => Giải quyết các bài toán phư tạp liên quan đến API trong dự án
// https://cvsy7f-8080.csb.app/posts

import { client } from "./client.js";

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
const getPosts = async (query = {}) => {
     const queryString = new URLSearchParams(query).toString();
     const { data: posts } = await client.get("/posts?" + queryString);
     // console.log(queryString);
     // console.log(posts);
     render(posts);
};
getPosts({
     _sort: "id",
     _order: "desc",
});

let order = "desc";
let sort = "id";
let keyword = "";
getPosts({
     _sort: sort,
     _order: order,
});
/// Chức năng tìm kiếm
const searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", function (e) {
     e.preventDefault();
     const keywordEl = e.target.querySelector(".keyword");
     const keyword = keywordEl.value;
     getPosts({
          _sort: sort,
          _order: order,
          q: keyword,
     });
     console.log(keyword);
     keywordEl.value = "";
});

/// Chức năng sắp xếp
const sortByEl = document.querySelector(".sort-by");
sortByEl.addEventListener("change", function (e) {
     const type = e.target.value;
     getPosts({
          _sort: "id",
          _order: type,
     });
});
