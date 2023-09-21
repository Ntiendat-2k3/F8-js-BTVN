let currentDrag;
let dragClone;

document.getElementById("list-container").addEventListener("mousedown", function (e) {
     let target = e.target;

     if (target.classList.contains("chapter") || target.classList.contains("lesson")) {
          currentDrag = target;

          // Tạo bản sao
          dragClone = currentDrag.cloneNode(true);
          dragClone.style.position = "absolute";
          dragClone.style.pointerEvents = "none"; // Đảm bảo không có sự kiện nào xảy ra trên bản sao
          dragClone.classList.add("dragging");
          document.body.appendChild(dragClone);

          updateDragClonePosition(e);

          e.preventDefault();
     }
});

document.addEventListener("mousemove", function (e) {
     if (!dragClone) return;
     updateDragClonePosition(e);
});

document.addEventListener("mouseup", function (e) {
     if (!dragClone) return;

     // Xác định vị trí mới cho phần tử gốc
     let container = document.getElementById("list-container");
     let closest = getClosestElement(e);

     if (closest) {
          container.insertBefore(currentDrag, closest);
     }

     // Xóa bản sao và cập nhật đánh số
     dragClone.remove();
     dragClone = null;
     updateNumbering();
});

function updateDragClonePosition(e) {
     dragClone.style.left = e.pageX - currentDrag.offsetWidth / 2 + "px";
     dragClone.style.top = e.pageY - currentDrag.offsetHeight / 2 + "px";
}

function getClosestElement(e) {
     let container = document.getElementById("list-container");
     let closest = null;
     let closestDistance = Infinity;
     Array.from(container.children).forEach((child) => {
          let rect = child.getBoundingClientRect();
          let distance = Math.abs(e.clientY - rect.top);

          if (distance < closestDistance && child !== currentDrag) {
               closest = child;
               closestDistance = distance;
          }
     });
     return closest;
}

function updateNumbering() {
     let chapterCount = 1;
     let lessonCount = 1;
     Array.from(document.getElementById("list-container").children).forEach((child) => {
          if (child.classList.contains("chapter")) {
               const chapterTitle = child.textContent.split(" ")[1]; // Lấy tên chương
               child.textContent = "Chương " + chapterCount++ + ": " + chapterTitle;
               lessonCount = 1;
          } else if (child.classList.contains("lesson")) {
               const lessonTitle = child.textContent.split(": ")[1]; // Lấy tên bài học
               child.textContent = "Bài " + lessonCount++ + ": " + lessonTitle;
          }
     });
}
