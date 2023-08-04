const textElement = document.getElementById("changingTextColor");
const textOrigin = textElement.innerText;
console.log(textOrigin);
let currentIndex = 0;

function changeColorText() {
     const words = textOrigin.split(" ");
     const word = words[currentIndex % words.length];

     const colorWord = `<span style="color: #e84393">${word}</span>`;

     const newText = textOrigin.replace(word, colorWord);
     textElement.innerHTML = newText;
     currentIndex++;
}
setInterval(changeColorText, 500);


