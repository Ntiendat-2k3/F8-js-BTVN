let data = [];
let currentQuestionIndex = 0;
let score = 0;

function startGame() {
     document.getElementById("start-button").style.display = "none";
     document.getElementById("choose-button").style.display = "block";

     fetch("https://cvsy7f-8080.csb.app/questions")
          .then((response) => response.json())
          .then((quizData) => {
               data = quizData;
               renderQuestion(currentQuestionIndex);
          })
          .catch((error) => {
               console.error("Error fetching data:", error);
          });
}

function renderQuestion(index) {
     const questionData = data[index];
     if (!questionData) {
          document.getElementById(
               "question-container"
          ).innerHTML = `Quiz Finished! Tổng điểm của bạn là: ${score}`;
          document.getElementById("choose-button").style.display = "none";
          document.getElementById("reset-button").style.display = "block";
          return;
     }

     let optionsHTML = "";
     for (let option in questionData.options) {
          optionsHTML += `<label>
                              <input type="checkbox" name="option" value="${option}">
                              ${option}. ${questionData.options[option]}
                         </label><br>`;
     }

     document.getElementById("question-container").innerHTML = `
               <h2>${questionData.question}</h2>
               ${optionsHTML}
          `;

     const allOptions = document.querySelectorAll('input[name="option"]');
     allOptions.forEach((option) => {
          option.disabled = false; // Make sure checkboxes are enabled for a new question
     });
}

function checkAnswer() {
     const selectedOptions = document.querySelectorAll('input[name="option"]:checked');

     if (selectedOptions.length === 0) {
          alert("Vui lòng chọn ít nhất một câu trả lời!");
          return;
     }

     // Disable all checkboxes after the user chooses an answer
     const allOptions = document.querySelectorAll('input[name="option"]');
     allOptions.forEach((option) => {
          option.disabled = true;
     });

     let isCorrect = true;
     const correctAnswers = data[currentQuestionIndex].answer;

     selectedOptions.forEach((option) => {
          if (!correctAnswers.includes(option.value)) {
               isCorrect = false;
          }
     });

     if (isCorrect && correctAnswers.length === selectedOptions.length) {
          document.getElementById("feedback").textContent =
               "Chính xác! Chúc mừng bạn được 200 điểm";
          score += 200;
          document.getElementById("score-display").textContent = `Điểm số: ${score}`;
     } else {
          document.getElementById("feedback").textContent = "Đáp án chưa chính xác";

          // Highlight the correct answers
          console.log(correctAnswers);
          [...correctAnswers].forEach((correctOption) => {
               const correctElem = document.querySelector(
                    `input[name="option"][value="${correctOption}"]`
               ).parentNode;
               correctElem.classList.add("highlight-correct");
          });
     }
     

     document.getElementById("choose-button").style.display = "none";
     document.getElementById("next-button").style.display = "block";
}    

function nextQuestion() {
     currentQuestionIndex++;
     renderQuestion(currentQuestionIndex);
     document.getElementById("feedback").textContent = "";
     document.getElementById("choose-button").style.display = "block";
     document.getElementById("next-button").style.display = "none";
}

function resetGame() {
     score = 0;
     currentQuestionIndex = 0;
     document.getElementById("score-display").textContent = `Điểm số: ${score}`;
     document.getElementById("reset-button").style.display = "none";
     document.getElementById("next-button").style.display = "none";
     document.getElementById("choose-button").style.display = "block";
     renderQuestion(currentQuestionIndex);
}

// const startButton = document.getElementById("start-button");
// const chooseButton = document.getElementById("choose-button");
// const nextButton = document.getElementById("next-button");
// const resetButton = document.getElementById("reset-button");
// const questionContainer = document.getElementById("question-container");
// const feedback = document.getElementById("feedback");
// const scoreDisplay = document.getElementById("score-display");

// let data = [];
// let currentQuestionIndex = 0;
// let score = 0;

// function startGame() {
//      startButton.style.display = "none";
//      chooseButton.style.display = "block";

//      fetch("https://cvsy7f-8080.csb.app/questions")
//           .then((response) => response.json())
//           .then((quizData) => {
//                data = quizData;
//                renderQuestion(currentQuestionIndex);
//           })
//           .catch((error) => {
//                console.error("Error fetching data:", error);
//           });
// }

// function renderQuestion(index) {
//      const questionData = data[index];

//      if (!questionData) {
//           endQuiz();
//           return;
//      }

//      let optionsHTML = Object.entries(questionData.options)
//           .map(
//                ([key, value]) => `
//             <label>
//                 <input type="checkbox" name="option" value="${key}">
//                 ${key}. ${value}
//             </label><br>`
//           )
//           .join("");

//      questionContainer.innerHTML = `<h2>${questionData.question}</h2>${optionsHTML}`;
// }

// function checkAnswer() {
//      const selectedOptions = Array.from(
//           document.querySelectorAll('input[name="option"]:checked')
//      ).map((opt) => opt.value);

//      if (selectedOptions.length === 0) {
//           alert("Vui lòng chọn ít nhất một câu trả lời!");
//           return;
//      }

//      const correctAnswers = data[currentQuestionIndex].answer;

//      const isCorrect =
//           selectedOptions.length === correctAnswers.length &&
//           selectedOptions.every((option) => correctAnswers.includes(option));

//      feedback.textContent = isCorrect
//           ? "Chính xác! Chúc mừng bạn được 200 điểm"
//           : "Đáp án chưa chính xác";

//      if (isCorrect) {
//           score += 200;
//           scoreDisplay.textContent = `Điểm số: ${score}`;
//      }

//      toggleButtons();
// }

// function nextQuestion() {
//      currentQuestionIndex++;
//      renderQuestion(currentQuestionIndex);
//      feedback.textContent = "";
//      toggleButtons();
// }

// function resetGame() {
//      score = 0;
//      currentQuestionIndex = 0;
//      scoreDisplay.textContent = `Điểm số: ${score}`;
//      chooseButton.style.display = "block";
//      resetButton.style.display = "none";
//      renderQuestion(currentQuestionIndex);
// }

// function toggleButtons() {
//      chooseButton.style.display = chooseButton.style.display === "none" ? "block" : "none";
//      nextButton.style.display = nextButton.style.display === "none" ? "block" : "none";
// }

// function endQuiz() {
//      questionContainer.innerHTML = `Quiz Finished! Tổng điểm của bạn là: ${score}`;
//      chooseButton.style.display = "none";
//      resetButton.style.display = "block";
// }
