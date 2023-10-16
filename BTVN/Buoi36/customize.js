let data = [];
let currentQuestionIndex = 0;
let score = 0;
const COUNTDOWN_TIME = 5;
let timerInterval;

function getElement(id) {
     return document.getElementById(id);
}

function toggleDisplay(id, displayStyle) {
     getElement(id).style.display = displayStyle;
}

function fetchQuestions() {
     fetch("https://cvsy7f-8080.csb.app/questions")
          .then((response) => response.json())
          .then((quizData) => {
               data = quizData;
               renderQuestion(currentQuestionIndex);
          })
          .catch((error) => console.error("Error fetching data:", error));
}

function renderQuestion(index) {
     const questionData = data[index];
     if (!questionData) {
          getElement(
               "question-container"
          ).innerHTML = `Quiz Finished! Tổng điểm của bạn là: ${score}`;
          toggleDisplay("choose-button", "none");
          toggleDisplay("reset-button", "block");
          return;
     }

     const optionsHTML = Object.entries(questionData.options)
          .map(
               ([key, value]) => `
            <label onclick="toggleCheckbox(event)">
                <input type="checkbox" class="hidden-checkbox" name="option" value="${key}">
                <span>${key}. ${value}</span>
            </label><br>
        `
          )
          .join("");

     getElement("question-container").innerHTML = `
        <h2>${questionData.question}</h2>
        ${optionsHTML}
    `;

     document
          .querySelectorAll('input[name="option"]')
          .forEach((option) => (option.disabled = false));

     startNewTimer();
}

function startNewTimer() {
     resetTimer();
     startTimer();
}

function checkAnswer() {
     const selectedOptions = [...document.querySelectorAll('input[name="option"]:checked')];
     const correctAnswers = data[currentQuestionIndex].answer;

     if (!selectedOptions.length) {
          alert("Vui lòng chọn ít nhất một câu trả lời!");
          return;
     }

     const isCorrect =
          selectedOptions.every((option) => correctAnswers.includes(option.value)) &&
          correctAnswers.length === selectedOptions.length;

     if (isCorrect) {
          getElement("feedback").textContent = "Chính xác! Chúc mừng bạn được 200 điểm";
          score += 200;
     } else {
          getElement("feedback").textContent = "Đáp án chưa chính xác";
          correctAnswers.forEach((correctOption) => {
               const correctElem = document.querySelector(
                    `input[name="option"][value="${correctOption}"]`
               ).parentNode;
               correctElem.classList.add("highlight-correct");
          });
     }

     getElement("score-display").textContent = `Điểm số: ${score}`;
     toggleDisplay("choose-button", "none");
     toggleDisplay("next-button", "block");
     disableCheckboxes(correctAnswers);
     resetTimer();
}

function handleTimesUp() {
     alert("Hết giờ!");
     checkAnswer();
     setTimeout(nextQuestion, 2000);
}

function startGame() {
     toggleDisplay("start-button", "none");
     toggleDisplay("choose-button", "block");
     fetchQuestions();
}

function nextQuestion() {
     currentQuestionIndex++;
     toggleDisplay("choose-button", "block");
     toggleDisplay("next-button", "none");
     getElement("feedback").textContent = "";
     renderQuestion(currentQuestionIndex);
}

function toggleCheckbox(event) {
     const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
     if (checkbox.disabled) return;
     checkbox.checked = !checkbox.checked;
     event.currentTarget.style.backgroundColor = checkbox.checked ? "#d3d3d3" : "transparent";
}

function startTimer() {
     getElement("timer").textContent = `Thời gian: ${COUNTDOWN_TIME}s`;
     timerInterval = setInterval(() => {
          getElement("timer").textContent = `Thời gian: --${COUNTDOWN_TIME}s`;
          if (--countdown <= 0) {
               clearInterval(timerInterval);
               handleTimesUp();
          }
     }, 1000);
}

function resetTimer() {
     clearInterval(timerInterval);
     countdown = COUNTDOWN_TIME;
}

function disableCheckboxes(correctAnswers) {
     document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
          if (!correctAnswers.includes(checkbox.value)) {
               checkbox.disabled = true;
               checkbox.parentNode.style.opacity = 0.5;
          }
     });
}

function resetGame() {
     score = 0;
     currentQuestionIndex = 0;
     getElement("score-display").textContent = `Điểm số: ${score}`;
     toggleDisplay("reset-button", "none");
     toggleDisplay("next-button", "none");
     toggleDisplay("choose-button", "block");
     renderQuestion(currentQuestionIndex);
}
