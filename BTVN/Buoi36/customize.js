class QuizGame {
     constructor() {
          this.data = [];
          this.currentQuestionIndex = 0;
          this.score = 0;
          this.countdown = 5;
          this.timerInterval = null;
          this.elements = {
               startButton: document.getElementById("start-button"),
               chooseButton: document.getElementById("choose-button"),
               nextButton: document.getElementById("next-button"),
               resetButton: document.getElementById("reset-button"),
               feedback: document.getElementById("feedback"),
               scoreDisplay: document.getElementById("score-display"),
               timer: document.getElementById("timer"),
               questionContainer: document.getElementById("question-container"),
          };

          this.elements.startButton.addEventListener("click", () => this.startGame());
          this.elements.chooseButton.addEventListener("click", () => this.checkAnswer());
          this.elements.nextButton.addEventListener("click", () => this.nextQuestion());
          this.elements.resetButton.addEventListener("click", () => this.resetGame());
     }

     shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
               [array[i], array[j]] = [array[j], array[i]];
          }
     }

     startGame() {
          this.elements.startButton.style.display = "none";
          this.elements.chooseButton.style.display = "block";

          fetch("https://cvsy7f-8080.csb.app/questions")
               .then((response) => response.json())
               .then((quizData) => {
                    this.data = quizData;
                    this.shuffleArray(this.data);
                    this.renderQuestion(this.currentQuestionIndex);
               })
               .catch((error) => {
                    console.error("Error fetching data:", error);
               });
               
     }

     renderQuestion(index) {
          const questionData = this.data[index];
          if (!questionData) {
               this.endGame();
               return;
          }

          let optionsHTML = "";
          for (let option in questionData.options) {
               optionsHTML += `<label>
                    <input type="checkbox" class="hidden-checkbox" name="option" value="${option}">
                    <span>${option}. ${questionData.options[option]}</span>
               </label><br>`;
          }

          this.elements.questionContainer.innerHTML = `
               <h2>${questionData.question}</h2>
               ${optionsHTML}
          `;

          // Add click event for each label
          const labels = this.elements.questionContainer.querySelectorAll("label");
          labels.forEach((label) => {
               label.addEventListener("click", (event) => this.handleLabelClick(event));
          });

          this.resetTimer();
          this.startTimer();
     }

     endGame() {
          console.log("end game");
          this.elements.questionContainer.innerHTML = `Quiz Finished! Tổng điểm của bạn là: ${this.score}`;
          // Ẩn nút "Choose" và nút "Next"
          this.elements.chooseButton.style.display = "none";
          this.elements.nextButton.style.display = "none";

          // Hiện nút "Chơi lại"
          this.elements.resetButton.style.display = "block";
          this.resetTimer();

          // Hiển thị tổng điểm và nút "Chơi lại"
          this.elements.scoreDisplay.textContent = `Điểm số: ${this.score}`;
          this.elements.scoreDisplay.style.display = "block";
     }

     disableCheckboxes(correctAnswers) {
          const checkboxes = document.querySelectorAll('input[type="checkbox"]');

          checkboxes.forEach((checkbox) => {
               if (!correctAnswers.includes(checkbox.value)) {
                    checkbox.disabled = true;
                    checkbox.parentNode.style.opacity = 0.5;
               }
          });
     }

     handleLabelClick(event) {
          const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
          if (checkbox.disabled) return;

          checkbox.checked = !checkbox.checked;
          if (checkbox.checked) {
               event.currentTarget.style.backgroundColor = "#d3d3d3";
          } else {
               event.currentTarget.style.backgroundColor = "transparent";
          }
     }

     checkAnswer() {
          const selectedOptions = document.querySelectorAll('input[name="option"]:checked');

          if (selectedOptions.length === 0) {
               alert("Vui lòng chọn ít nhất một câu trả lời!");
               return;
          }

          let isCorrect = true;
          const correctAnswers = this.data[this.currentQuestionIndex].answer;
          selectedOptions.forEach((option) => {
               if (!correctAnswers.includes(option.value)) {
                    isCorrect = false;
               }
          });

          if (isCorrect && correctAnswers.length === selectedOptions.length) {
               this.elements.feedback.textContent = "Chính xác! Chúc mừng bạn được 200 điểm";
               this.elements.feedback.style.display = "block";
               this.score += 200;
               this.elements.scoreDisplay.textContent = `Điểm số: ${this.score}`;
               this.elements.feedback.classList.add("correct-feedback");
               this.elements.feedback.classList.remove("wrong-feedback");
          } else {
               this.elements.feedback.textContent = "Đáp án chưa chính xác";
               this.elements.feedback.style.display = "block";
               [...correctAnswers].forEach((correctOption) => {
                    const correctElem = document.querySelector(
                         `input[name="option"][value="${correctOption}"]`
                    ).parentNode;
                    correctElem.classList.add("highlight-correct");
               });
               this.elements.feedback.classList.add("wrong-feedback");
               this.elements.feedback.classList.remove("correct-feedback");
          }

          this.elements.chooseButton.style.display = "none";
          this.elements.nextButton.style.display = "block";
          this.disableCheckboxes(correctAnswers);
          this.resetTimer();
     }

     nextQuestion() {
          this.currentQuestionIndex++;
          this.renderQuestion(this.currentQuestionIndex);
          this.elements.feedback.textContent = "";
          this.elements.chooseButton.style.display = "block";
          this.elements.nextButton.style.display = "none";
          this.resetTimer();
          this.startTimer();
     }

     toggleCheckbox(event) {
          const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
          if (checkbox.disabled) return;

          checkbox.checked = !checkbox.checked;
          if (checkbox.checked) {
               event.currentTarget.style.backgroundColor = "#d3d3d3";
          } else {
               event.currentTarget.style.backgroundColor = "transparent";
          }
     }

     startTimer() {
          this.elements.timer.textContent = `Thời gian: ${this.countdown}s`;
          this.timerInterval = setInterval(() => {
               this.countdown--;
               this.elements.timer.textContent = `Thời gian: ${this.countdown}s`;
               if (this.countdown <= 0) {
                    clearInterval(this.timerInterval);
                    this.handleTimesUp();
               }
          }, 1000);
     }

     resetTimer() {
          clearInterval(this.timerInterval);
          this.countdown = 5;
     }

     handleTimesUp() {
          alert("Hết giờ!");
          this.checkAnswer();
          setTimeout(() => {
               this.nextQuestion();
          }, 2000);
     }

     resetGame() {
          this.score = 0;
          this.currentQuestionIndex = 0;
          this.elements.scoreDisplay.textContent = `Điểm số: ${this.score}`;
          this.elements.resetButton.style.display = "none";
          this.elements.nextButton.style.display = "none";
          this.elements.chooseButton.style.display = "block";
          this.renderQuestion(this.currentQuestionIndex);
     }
}

document.addEventListener("DOMContentLoaded", () => {
     const game = new QuizGame();
});
