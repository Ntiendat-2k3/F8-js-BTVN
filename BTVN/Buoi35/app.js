// let page = 1;
// const limit = 10;
let isLoading = false; // Biến trạng thái kiểm tra xem liệu chúng ta có đang tải dữ liệu hay không

function fetchPosts() {
     if (isLoading) {
          return; // Nếu đang tải dữ liệu, không thực hiện bất kỳ yêu cầu nào
     }

     isLoading = true; // Đặt trạng thái đang tải dữ liệu
     // Hiển thị trạng thái đang tải
     document.getElementById("loading").style.display = "block";

     // Chờ 1.5 giây trước khi gọi API
     setTimeout(() => {
          fetch(`https://cvsy7f-8080.csb.app/blog`)
               .then((response) => {
                    if (!response.ok) {
                         throw new Error("Network response was not ok");
                    }
                    return response.json();
               })
               .then((data) => {
                    // Ẩn trạng thái đang tải
                    document.getElementById("loading").style.display = "none";
                    isLoading = false; // Đặt trạng thái không tải dữ liệu

                    // Nếu không có dữ liệu trả về (đã đọc hết bài viết), bắt đầu lại từ trang đầu tiên
                    if (data.length === 0) {
                         page = 1;
                         fetchPosts();
                         return;
                    }

                    data.forEach((post) => {
                         const postElement = `
                         <div class="post">
                              <h2>${post.title}</h2>
                              <p>${post.content}</p>
                              <div><img src="${post.image}" alt="image" /></div>
                              <span>By: ${post.author}</span>
                         </div>
                    `;
                         document.getElementById("post-list").innerHTML += postElement;
                    });
                    page++;
               })
               .catch((error) => {
                    // Ẩn trạng thái đang tải nếu có lỗi
                    document.getElementById("loading").style.display = "none";
                    isLoading = false; // Đặt trạng thái không tải dữ liệu
                    console.error("Error fetching the data:", error);
               });
     }, 1500);
}

fetchPosts();

window.onscroll = function () {
     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
          // Thêm một lề 50px để tránh gọi API liên tục khi cuộn
          fetchPosts();
     }
};
