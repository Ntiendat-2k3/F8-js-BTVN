// DOM Event: 
// - Mỗi thẻ html có các event nhất định (có sẵn)
// - Có event xuất hiện trong tất cả các thẻ 
// - có event chỉ xuất hiện trong 1 số thẻ 

// Ví dụ: 
// - click
// - dblclick
// - mouseover
// - mouseout 
// - mousemove
// => thẻ html nào cũng có 

// - submit => chỉ xuất hiện trong thẻ form 
// - keyup, keydown => Thường xuyên xuất hiện trong các ô nhập liệu 
// - play, pause, timeupdate => xuất hiện trong thẻ audio, video

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var btn = $(".btn");
console.log([btn]);
btn.onclick = () => {
     console.log("Register successful");
}
btn.onmouseover = () => {
     console.log("Over");
}
btn.onmouseout = () => {
     console.log("Out");
}
btn.onmouseout = () => {
     console.log("Out");
}
btn.onmousemove = () => {
     console.log("move");
}

// Form
var email = $(".email");
email.onchange = () => {
     console.log("Đã xong email đã nhập: ", email.value);
}
email.onfocus = () => {
     console.log("Focus");
}
email.onblur = () => {
     console.log("Blur");
}
email.onkeyup = (e) => {
     console.log("Đang gõ phím: ", e.key);
}