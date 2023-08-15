var keyword = "Lorem";
var content =
     "abc <span>Lorem</span> psum dolor sit amet consectetur adipisicing elit. Ratione voluptatem, tempora animi sequi totam, voluptate accusantium quae repudiandae facilis dolores omnis eveniet eum rem minima nihil quis dolorem! Laboriosam quisquam dolorem quam exercitationem, autem iste iure veniam quas facere facilis. Minima, ullam! Deserunt itaque corrupti error sequi sapiente sit? Minima.";

var position = content.toLowerCase().indexOf(keyword.toLowerCase());
const result = "";
let count = 0;  
while (position !== -1) {
     result +=
          content.slice(0, position) +
          `<span>${content.slice(position, position + keyword.length)}</span>`;
     content += content.slice(position + keyword.length);

     position = content.toLowerCase().indexOf(keyword.toLowerCase());
     count++;
}
result = result + content;

var title = `<p>Tìm kiếm với từ khóa <b>${keyword}</b></p>`;
var bottom = `<p>Đã tìm thấy <b>${count}</b> kết quả với từ khóa <b>${keyword}</b></p>`;
document.write(title + result + bottom);
