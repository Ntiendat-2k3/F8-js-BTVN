import image from "./Assets/Image/404-error.jpg";
import "./Assets/Error.scss";

export const Error = () => {
     document.body.classList.add("error-state");
     const overlay = document.createElement("div");
     overlay.className = "error-overlay";
     overlay.innerHTML = `
          <div class="error-page">
               <img src="${image}" alt="404-Error" />
               <h2>Oops! Trang bạn đang tìm kiếm không tồn tại.</h2>
               <p>Xin lỗi vì sự bất tiện này. Hãy thử lại hoặc quay lại trang chính.</p>
          </div>
     `;
     document.body.appendChild(overlay);
};
