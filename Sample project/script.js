// ============================================
// Quiz data: each question has text, 4 options, and the index of the correct answer (0 to 3)
// ============================================
var questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctIndex: 4
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctIndex: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctIndex: 1
  },
  {
    question: "What is 7 × 8?",
    options: ["54", "56", "58", "64"],
    correctIndex: 1
  },
  {
    question: "Which gas do plants take in from the air?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correctIndex: 2
  }
];

// Track which question we're on and the player's score
var currentQuestionIndex = 0;
var score = 0;

// We save elements in variables so we can use them later without searching the page again
var questionTextEl = document.getElementById("questionText");
var optionsContainerEl = document.getElementById("optionsContainer");
var feedbackEl = document.getElementById("feedback");
var scoreMessageEl = document.getElementById("scoreMessage");
var resultsEl = document.getElementById("results");
var tryAgainBtn = document.getElementById("tryAgainBtn");
var progressEl = document.getElementById("progress");

// This function shows one question at a time.
function showQuestion(index) {
  var q = questions[index];
  questionTextEl.textContent = q.question;

  // Update progress text: "Question 2 of 5"
  progressEl.textContent = "Question " + (index + 1) + " of " + questions.length;

  // Clear old option buttons and any feedback
  optionsContainerEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";

  // Create a button for each option
  for (var i = 0; i < q.options.length; i++) {
    var btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = q.options[i];
    // Mark the correct answer with data-correct so we can check when they click
    if (i === q.correctIndex) {
      btn.setAttribute("data-correct", "true");
    }
    btn.addEventListener("click", function() {
      handleAnswer(this);
    });
    optionsContainerEl.appendChild(btn);
  }
}

// When the user clicks an answer, we check if it's right and show feedback.
function handleAnswer(clickedButton) {
  // Disable all buttons so they can't click again until we move to next question
  var buttons = optionsContainerEl.querySelectorAll(".option-btn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }

  var isCorrect = clickedButton.getAttribute("data-correct") === "true";

  if (isCorrect) {
    score = score + 1;
    feedbackEl.textContent = "Correct!";
    feedbackEl.className = "feedback correct-msg";
    clickedButton.classList.add("correct");
  } else {
    feedbackEl.textContent = "Wrong!";
    feedbackEl.className = "feedback wrong-msg";
    clickedButton.classList.add("wrong");
    // Show which one was correct
    var correctBtn = optionsContainerEl.querySelector('[data-correct="true"]');
    if (correctBtn) {
      correctBtn.classList.add("correct");
    }
  }

  // After a short delay, go to next question or show results
  setTimeout(function() {
    currentQuestionIndex = currentQuestionIndex + 1;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      showResults();
    }
  }, 1200);
}

// When all questions are done, we show the score.
function showResults() {
  scoreMessageEl.textContent = "You got " + score + " out of " + questions.length + "!";
  resultsEl.classList.remove("hidden");
  // Hide the quiz box so only results show
  document.querySelector(".quiz-box").style.display = "none";
}

// Start the quiz over: reset score and question index, show first question again.
function resetQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  resultsEl.classList.add("hidden");
  document.querySelector(".quiz-box").style.display = "block";
  showQuestion(0);
}

// When the user clicks "Try again", run resetQuiz
tryAgainBtn.addEventListener("click", resetQuiz);

// Start the quiz when the page loads - show the first question
showQuestion(0);
