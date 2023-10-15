// let page = 1;
// const limit = 10;
let isLoading = false;

function fetchPosts() {
     if (isLoading) {
          return;
     }

     isLoading = true;
     document.getElementById("loading").style.display = "block";

     setTimeout(() => {
          fetch(`https://cvsy7f-8080.csb.app/blog`)
               .then((response) => {
                    if (!response.ok) {
                         throw new Error("Network response was not ok");
                    }
                    return response.json();
               })
               .then((data) => {
                    console.log(data);
                    document.getElementById("loading").style.display = "none";
                    isLoading = false;

                    // Nếu không có dữ liệu trả về (đã đọc hết bài viết), bắt đầu lại từ trang đầu tiên
                    if (data.length === 0) {
                         // page = 1;
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
                    // page++;
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
