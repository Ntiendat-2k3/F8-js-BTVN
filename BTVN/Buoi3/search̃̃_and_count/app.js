// /<\/?mark>/g, '';

const inputSearch = document.getElementById("searchInput");
const paragraph = document.getElementById("paragraph");
const countDisplay = document.getElementById("countDisplay");
const text = paragraph.innerText;
let count = 0;

function escapeRegExp(string) {
     return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}

inputSearch.addEventListener("input", function () {
     const inputValue = this.value.toLowerCase();
     const escapedInputValue = escapeRegExp(inputValue);

     // loại bỏ các thẻ <mark> trong đoạn văn bản text
     const highlightText = text.replace(/<\/?mark>/g, "");

     if (inputValue.length > 0) {
          // tìm kiếm các từ khớp với giá trị của input
          // new RegExp(pattern: biểu thức muốn tìm, flags: g / i / m )
          const regex = new RegExp(escapedInputValue, "gi");
          let newText = highlightText.replace(regex, (match) => `<mark>${match}</mark>`);
          paragraph.innerHTML = newText;

          // Count
          count = (highlightText.match(regex) || []).length;
          countDisplay.textContent = `Từ khóa "${inputValue}" xuất hiện: ${count} lần`;
     } else {
          paragraph.innerHTML = highlightText;
          countDisplay.textContent = "";
          count = 0;
     }
});
