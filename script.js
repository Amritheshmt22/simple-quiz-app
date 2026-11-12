(function () {
  "use strict";

  const questions = [
    {
      question: "Which HTML tag creates the largest heading?",
      answers: ["<heading>", "<h6>", "<h1>", "<title>"],
      correctIndex: 2,
      explanation: "<h1> is the highest-level HTML heading."
    },
    {
      question: "Which CSS property changes the text color?",
      answers: ["font-style", "color", "background", "text-align"],
      correctIndex: 1,
      explanation: "The color property sets the foreground text color."
    },
    {
      question: "Which JavaScript method selects an element by its id?",
      answers: ["getElementById", "querySelectorAll", "createElement", "appendChild"],
      correctIndex: 0,
      explanation: "document.getElementById returns the element with the matching id."
    },
    {
      question: "Which value is a valid CSS unit?",
      answers: ["px", "ptx", "emx", "per"],
      correctIndex: 0,
      explanation: "px is a common CSS pixel unit."
    },
    {
      question: "Where should a script tag load an external JavaScript file?",
      answers: ["Using the src attribute", "Inside a style attribute", "Inside a meta tag", "Using the href attribute"],
      correctIndex: 0,
      explanation: "An external script uses the src attribute, such as script src=\"script.js\"."
    }
  ];

  const BEST_SCORE_KEY = "simple-quiz-app-best-score";

  const questionCount = document.getElementById("questionCount");
  const scoreText = document.getElementById("scoreText");
  const progressBar = document.getElementById("progressBar");
  const questionPanel = document.getElementById("questionPanel");
  const resultPanel = document.getElementById("resultPanel");
  const questionText = document.getElementById("questionText");
  const answersList = document.getElementById("answersList");
  const feedbackText = document.getElementById("feedbackText");
  const nextButton = document.getElementById("nextButton");
  const finalScore = document.getElementById("finalScore");
  const resultMessage = document.getElementById("resultMessage");
  const bestScoreText = document.getElementById("bestScoreText");
  const restartButton = document.getElementById("restartButton");

  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;

  function calculatePercentage(correctAnswers, totalQuestions) {
    if (totalQuestions <= 0) {
      return 0;
    }

    return Math.round((correctAnswers / totalQuestions) * 100);
  }

  function getResultMessage(correctAnswers, totalQuestions) {
    const percentage = calculatePercentage(correctAnswers, totalQuestions);

    if (percentage === 100) {
      return "Perfect score. You know the basics well.";
    }

    if (percentage >= 80) {
      return "Great work. One more run can make it perfect.";
    }

    if (percentage >= 60) {
      return "Good effort. Review the explanations and try again.";
    }

    return "Keep practicing. Restart the quiz and improve your score.";
  }

  function loadBestScore() {
    const savedScore = Number(window.localStorage.getItem(BEST_SCORE_KEY));
    return Number.isFinite(savedScore) && savedScore >= 0 ? savedScore : 0;
  }

  function saveBestScore(value) {
    if (value > loadBestScore()) {
      window.localStorage.setItem(BEST_SCORE_KEY, String(value));
    }
  }

  function updateProgress() {
    const completed = answered ? currentQuestionIndex + 1 : currentQuestionIndex;
    progressBar.style.width = `${(completed / questions.length) * 100}%`;
    questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    scoreText.textContent = `Score: ${score}`;
  }

  function renderQuestion() {
    const current = questions[currentQuestionIndex];
    answered = false;
    questionText.textContent = current.question;
    feedbackText.textContent = "Choose an answer.";
    feedbackText.className = "feedback-text";
    nextButton.disabled = true;
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Show result" : "Next question";
    answersList.replaceChildren();

    current.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.textContent = answer;
      button.addEventListener("click", () => selectAnswer(index));
      answersList.append(button);
    });

    updateProgress();
  }

  function selectAnswer(selectedIndex) {
    if (answered) {
      return;
    }

    answered = true;
    const current = questions[currentQuestionIndex];
    const buttons = [...answersList.querySelectorAll("button")];
    const isCorrect = selectedIndex === current.correctIndex;

    if (isCorrect) {
      score += 1;
    }

    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === current.correctIndex) {
        button.classList.add("correct");
      } else if (index === selectedIndex) {
        button.classList.add("wrong");
      }
    });

    feedbackText.textContent = `${isCorrect ? "Correct." : "Not quite."} ${current.explanation}`;
    feedbackText.className = `feedback-text ${isCorrect ? "correct" : "wrong"}`;
    nextButton.disabled = false;
    updateProgress();
  }

  function showResult() {
    saveBestScore(score);
    questionPanel.hidden = true;
    resultPanel.hidden = false;
    finalScore.textContent = `${score}/${questions.length}`;
    resultMessage.textContent = getResultMessage(score, questions.length);
    bestScoreText.textContent = `Best score: ${loadBestScore()}/${questions.length}`;
    progressBar.style.width = "100%";
  }

  function goNext() {
    if (!answered) {
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      showResult();
      return;
    }

    currentQuestionIndex += 1;
    renderQuestion();
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    resultPanel.hidden = true;
    questionPanel.hidden = false;
    renderQuestion();
  }

  nextButton.addEventListener("click", goNext);
  restartButton.addEventListener("click", restartQuiz);

  renderQuestion();

  window.SimpleQuizApp = {
    questions,
    calculatePercentage,
    getResultMessage,
    loadBestScore
  };
}());
