let data = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let countdown = 5;
let timerInterval;


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
          optionsHTML += `<label onclick="toggleCheckbox(event)">
                              <input type="checkbox" class="hidden-checkbox" name="option" value="${option}">
                              <span>${option}. ${questionData.options[option]}</span>
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

     resetTimer(); // Đặt lại đồng hồ
     startTimer(); // Bắt đầu đếm ngược
}
function disableCheckboxes(correctAnswers) {
     const checkboxes = document.querySelectorAll('input[type="checkbox"]');

     checkboxes.forEach((checkbox) => {
          if (!correctAnswers.includes(checkbox.value)) {
               checkbox.disabled = true;
               checkbox.parentNode.style.opacity = 0.5;
          }
     });
}


function checkAnswer() {
     const selectedOptions = document.querySelectorAll('input[name="option"]:checked');

     if (selectedOptions.length === 0) {
          alert("Vui lòng chọn ít nhất một câu trả lời!");
          return;
     }
     
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
     disableCheckboxes(correctAnswers); 
     resetTimer();
}

function nextQuestion() {
     currentQuestionIndex++;
     renderQuestion(currentQuestionIndex);
     document.getElementById("feedback").textContent = "";
     document.getElementById("choose-button").style.display = "block";
     document.getElementById("next-button").style.display = "none";
     resetTimer();
     startTimer();
}
function toggleCheckbox(event) {
     if (event.currentTarget.querySelector('input[type="checkbox"]').disabled) return;
     const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
     checkbox.checked = !checkbox.checked;

     if (checkbox.checked) {
          event.currentTarget.style.backgroundColor = "#d3d3d3";
     } else {
          event.currentTarget.style.backgroundColor = "transparent";
     }
}
function startTimer() {
     document.getElementById("timer").textContent = `Thời gian: ${countdown}s`;
     timerInterval = setInterval(function () {
          countdown--;
          document.getElementById("timer").textContent = `Thời gian: ${countdown}s`;
          if (countdown <= 0) {
               clearInterval(timerInterval);
               handleTimesUp();
          }
     }, 1000);
}

function resetTimer() {
     clearInterval(timerInterval);
     countdown = 5;
}
function handleTimesUp() {
     alert("Hết giờ!");
     checkAnswer();
     setTimeout(() => {
          nextQuestion();
     }, 2000); // Chờ 2 giây trước khi chuyển sang câu hỏi mới
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
