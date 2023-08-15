const paragraph = document.getElementById("changingTextColor");
const text = paragraph.innerText;
let currentIndex = 0;

// function changeColorText() {
//      const words = text.split(" ");
//      const newText = words.map((word, index) => {
//           if (currentIndex % words.length === index) {
//                return `<span style="color: #e84393">${word}</span>`;
//           }
//           return word;
//      })
//      paragraph.innerHTML = newText.join(" ");
//      currentIndex++;
// }
// setInterval(changeColorText, 500);

function changeColorText() {
     const spaceText = text.indexOf(" ", currentIndex);
     const currentText =
          spaceText !== -1 ? text.slice(currentIndex, spaceText) : text.slice(currentIndex);

     const colorText = `<span style="color: #e84393">${currentText}</span>`;

     const newText =
          text.slice(0, currentIndex) + colorText + text.slice(currentIndex + currentText.length);
     // const newText = text.replace(currentText, colorText);

     paragraph.innerHTML = newText;
     currentIndex = spaceText !== -1 ? spaceText + 1 : 0;
}

setInterval(changeColorText, 500);
