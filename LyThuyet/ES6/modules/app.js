// Import các tài nguyên từ file khác

import getUsers, { getProducts, posts as postList } from "./home.js";
//! default phải viết trước không có báo lỗi
console.log(getUsers());
console.log(getProducts());
// console.log(posts);
console.log(postList); // đổi tên dùng "as"

import * as home from "./home.js";
console.log(home);

