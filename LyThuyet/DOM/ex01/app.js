// Trc khi thao tác với các thẻ html => Tạo element
// Dom Element => Tạo Element (Object) từ các thẻ html có sẵn

/***
 * - document.getElementbyId(): Truy xuất thông qua id, chỉ truy xuất đc thẻ đầu tiên
 * - document.getElementsByClassName(class): truy xuất thông qua class , trả về danh sách (HTMLCollection)
 * - document.getElementsByTagName(tag): truy xuất thông qua tên thẻ , trả về danh sách (HTMLCollection)
 * - document.querySelector(selector)
 * - document.querySelectorAll(selector)
 */

// var titleList = document.getElementsByClassName("title");
// console.log(titleList);
// for (let i = 0; i < titleList.length; i++) {
//      console.log(titleList[i]);
// }

// var titleList = document.getElementsByTagName("h1");
// console.log(titleList);
// for (let i = 0; i < titleList.length; i++) {
//      console.log(titleList[i]);
// }

// var titleList = document.querySelectorAll("h1");
// var titleList = document.querySelectorAll(".title");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var titleList = $$("#title");
console.log(titleList);
for (let i = 0; i < titleList.length; i++) {
     console.log(titleList[i]);
}

const heading1 = $(".content > .heading");
const heading2 = $(".element > .heading");
console.log(heading1, heading2);


