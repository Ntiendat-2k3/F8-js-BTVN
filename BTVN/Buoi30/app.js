function execCmd(commandName) {
     document.execCommand(commandName, false, null);
}
/// Reset
function resetEditor() {
     document.getElementById("editor").innerHTML = "";
     countWordsAndChars();
}

/// save DOC
function saveDoc() {
     var content = document.getElementById("editor").innerHTML;
     var blob = new Blob([content], { type: "text/html" });
     var link = document.createElement("a");
     link.href = URL.createObjectURL(blob);
     link.download = "document.txt";
     link.click();
}

/// Export PDF
function exportToPDF() {
     var content = document.getElementById("editor").innerHTML;
     var fileNameInput = document.getElementById("file-name");
     var fileName = fileNameInput.value.trim();

     if (!fileName) {
          alert("Please enter file name!");
          fileNameInput.style.border = "1px solid red";
          fileNameInput.focus();
          return;
     } else {
          fileNameInput.style.border = ""; 
     }

     var opt = {
          margin: 10,
          filename: fileName + ".pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
     };
     html2pdf().from(content).set(opt).save();
}

/// Count words
document.getElementById("editor").addEventListener("keyup", function () {
     countWordsAndChars();
});
function countWordsAndChars() {
     var content = document.getElementById("editor").innerText;
     var charCount = content.length;
     var wordCount = content.split(/\s+/).filter(function (word) {
          return word.length > 0;
     }).length;

     document.getElementById("charCount").innerText = charCount;
     document.getElementById("wordCount").innerText = wordCount;
}

/// Color Text
function execCmdWithArg(command, arg) {
     document.execCommand(command, false, arg);
}
document.getElementById("color-btn").addEventListener("input", function (e) {
     var color = e.target.value;
     execCmdWithArg("foreColor", color);
});

/// Theme
let isDarkMode = false;
let isRotate = false;
document.querySelector(".toolbar-left").addEventListener("click", function () {
     const icon = document.querySelector(".fa-gear");
     if (isRotate) {
          icon.classList.remove("rotate");
          icon.classList.add("rotate-reverse");
     } else {
          icon.classList.add("rotate");
          icon.classList.remove("rotate-reverse");
     }
     isRotate = !isRotate;

     toggleDarkTheme();
});

function toggleDarkTheme() {
     const body = document.body;
     const toolbar = document.querySelector(".toolbar");
     const container = document.querySelector(".container");
     const editor = document.getElementById("editor");
     const wordCount = document.querySelector(".word-count");
     const heading = document.querySelector(".heading");

     if (isDarkMode) {
          body.classList.remove("dark-mode");
          toolbar.classList.remove("dark-mode");
          container.classList.remove("dark-mode");
          editor.classList.remove("dark-mode");
          wordCount.style.color = "#4b5563";
          heading.style.color = "#4b5563";

          isDarkMode = false;
     } else {
          body.classList.add("dark-mode");
          toolbar.classList.add("dark-mode");
          container.classList.add("dark-mode");
          editor.classList.add("dark-mode");
          wordCount.style.color = "#fff";
          heading.style.color = "#fff";
          isDarkMode = true;
     }
}

/// Zoom
let currentFontSize = 16;
function zoomIn() {
     if (currentFontSize < 30) {
          currentFontSize += 2;
          document.getElementById("editor").style.fontSize = currentFontSize + "px";
     }
}
function zoomOut() {
     if (currentFontSize > 10) {
          currentFontSize -= 2;
          document.getElementById("editor").style.fontSize = currentFontSize + "px";
     }
}
document.addEventListener("keydown", function (e) {
     if (e.ctrlKey) {
          switch (e.key) {
               case "+":
               case "=":
                    zoomIn();
                    e.preventDefault();
                    break;
               case "-":
                    zoomOut();
                    e.preventDefault();
                    break;
          }
     }
});
