let timeRemaining = 10;
let isPaused = false;
const timerElement = document.getElementById("timer");
const button = document.getElementById("getLinkButton");

let lastUpdateTime = Date.now();

function updateCounter() {
     const currentTime = Date.now();
     const elapsedTime = currentTime - lastUpdateTime;

     if (elapsedTime >= 1000) {
          timeRemaining--;
          timerElement.innerText = timeRemaining;
          lastUpdateTime = currentTime;

          if (timeRemaining <= 0) {
               button.disabled = false;
               button.style.cursor = "pointer";
               return;
          }
     }

     if (!isPaused && timeRemaining > 0) {
          requestAnimationFrame(updateCounter);
     }
}

document.addEventListener("visibilitychange", () => {
     if (document.hidden) {
          isPaused = true;
     } else {
          isPaused = false;
          if (timeRemaining > 0) {
               requestAnimationFrame(updateCounter);
          }
     }
});

button.addEventListener("click", () => {
     window.location.href = "https://fullstack-nodejs.fullstack.edu.vn/";
});

window.onkeydown = (e) => {
     if (e.keyCode === 123) {
          // F12
          e.preventDefault();
          return false;
     }
};

requestAnimationFrame(updateCounter);



// function animate() {
//      // Cập nhật trạng thái hoặc vẽ lại một phần của trang web tại đây
//      // Yêu cầu frame tiếp theo
//      requestAnimationFrame(animate);
// }
// // Bắt đầu vòng lặp animation
// requestAnimationFrame(animate);