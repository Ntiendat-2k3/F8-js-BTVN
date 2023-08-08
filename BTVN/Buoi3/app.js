const textElement = document.getElementById("changingTextColor");
const textOrigin = textElement.innerText;
console.log(textOrigin);
let currentIndex = 0;

// function changeColorText() {
//      const words = textOrigin.split(" ");
//      const word = words[currentIndex % words.length];

//      const colorWord = `<span style="color: #e84393">${word}</span>`;

//      const newText = textOrigin.replace(word, colorWord);
//      textElement.innerHTML = newText;
//      currentIndex++;
// }

// function changeColorText() {
//      const words = textOrigin.split(" ");
//      const newText = words.map((word, index) => {
//           if (currentIndex % words.length === index) {
//                return `<span style="color: #e84393">${word}</span>`;
//           }
//           return word;
//      })
//      textElement.innerHTML = newText.join(" ");
//      currentIndex++;
// }
// setInterval(changeColorText, 500);

function changeColorText() {
     const spaceIndex = textOrigin.indexOf(" ", currentIndex);
     if (spaceIndex === -1) {
          currentIndex = 0;
     }

     const currentWord =
          spaceIndex !== -1
               ? textOrigin.slice(currentIndex, spaceIndex)
               : textOrigin.slice(currentIndex);

     const coloredWord = `<span style="color: #e84393">${currentWord}</span>`;

     if (spaceIndex !== -1) {
          currentIndex = spaceIndex + 1;
     } else {
          currentIndex = 0;
     }

     const newText = textOrigin.replace(currentWord, coloredWord);
     textElement.innerHTML = newText;
}

setInterval(changeColorText, 500);



