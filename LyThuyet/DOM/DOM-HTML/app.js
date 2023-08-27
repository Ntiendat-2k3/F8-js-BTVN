/// DOM html : Tháo tác nội dung, thuộc tính HTML
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// const content = $(".content");

// 1. Lấy nội dung trong thẻ html (lấy tất bên trong)
// console.log(content.innerHTML);

// 2. Lấy nội dung trong html (chỉ lấy text, loại bỏ khoảng trắng)
// console.log(content.innerText);

// 3. Lấy nội dung trong thẻ html (chỉ lấy text nhưng giữ nguyên khoảng trắng)
// console.log(content.textContent);

// 4. Lấy nội dung bao gồm element đang tác động (lấy chính nó và các nội dung bên trong)
// console.log(content.outerHTML);

// 5. Cập nhật nội dung HTML
// content.innerHTML = `<h1>JS</h1>`;
// content.innerText = `<h1>NTienDat</h1>`;
// content.outerHTML = `<h1>NTienDat_2k3</h1>`;
// content.outerText = `<h1>NTienDat_2003</h1>`;
// content.innerText = "";

const number = $(".number");
const up = $(".up");
const down = $(".down");
const up1 = $(".up span");
const down1 = $(".down span");
let countUp = 0;
let countDown = 0;
const handleUp = () => {
     let count = number.innerText;
     count++;
     countUp++;
     countDown--;
     number.innerText = count;
     up1.innerText = countUp;
     down1.innerText = countDown;
};
const handleDown = () => {
     let count = number.innerText;
     count--;
     countDown--;
     countUp++;
     number.innerText = count;
     down1.innerText = countDown;
     up1.innerText = countUp;
};
up.addEventListener("click", handleUp);
down.addEventListener("click", handleDown);

/// Thuộc tính:
// Thuộc tính có sẵn
const link = $(".link");
//: lấy giá trị thuộc tính
console.log(link.href);
console.log(link.target);
console.log(link.title);
//: Riêng thuộc tính class: element.className
console.log(link.className);

//: Cập nhật thuộc tính
link.href = "https://goggle.com";
link.id = "abc";

//: Giá trị mặc định của 1 thuộc tính sẽ là chuỗi rỗng
console.log(link.rel);

// Thuộc tính tự tạo (Data Attribute)
//: Lấy data attribute
console.log(link.getAttribute("data-count"));
console.log(link.dataset.count); // = data-count
console.log(link.dataset.indexNumber);

//: Thêm data attribute
link.setAttribute("data-name", "Dat");
console.log(link.dataset.name);

link.dataset.name = "TienDat_2K3";
console.log(link.dataset.name);

link.dataset.fullName = "nguyentiendat";
console.log(link.dataset.fullName);

const content = $(".content");
console.log(content.classList);
// Thêm class mới
content.classList.add("abc", "ahihi");

// Xóa class
content.classList.remove("ahihi");

// Kiểm tra class tồn tại
console.log(content.classList.contains("abc"));

// class toggle => Thêm class nếu không tồn tại, xóa class nếu tồn tại
content.classList.toggle("element");

// Xóa element
content.remove();

// Xóa thuộc tính
link.removeAttribute("data-count");


//:  BT 
