function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  
  Quiz.prototype.guess = function (answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  };
  
  Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.currentQuestionIndex];
  };
  
  Quiz.prototype.hasEnded = function () {
    return this.currentQuestionIndex >= this.questions.length;
  };
  
  function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  
  Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
  };
  
  var QuizUI = {
    displayNext: function () {
      if (quiz.hasEnded()) {
        this.displayScore();
      } else {
        this.displayQuestion();
        this.displayChoices();
        this.displayProgress();
      }
    },
    displayQuestion: function () {
      this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function () {
      var choices = quiz.getCurrentQuestion().choices;
  
      for (var i = 0; i < choices.length; i++) {
        this.populateIdWithHTML("choice" + i, choices[i]);
        this.guessHandler("guess" + i, choices[i]);
      }
    },
    displayScore: function () {
      var gameOverHTML = "<h1>Game Over</h1>";
      gameOverHTML += "<h2>Your score is: " + quiz.score + "/5</h2>";
      this.populateIdWithHTML("quiz", gameOverHTML);
    },
  
    populateIdWithHTML: function (id, text) {
      var element = document.getElementById(id);
  
      element.innerHTML = text;
    },
    guessHandler: function (id, guess) {
      var button = document.getElementById(id);
      button.onclick = function () {
        quiz.guess(guess);
        QuizUI.displayNext();
      };
    },
  
    displayProgress: function () {
      var currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.populateIdWithHTML(
        "progress",
        "Question " + currentQuestionNumber + " of " + quiz.questions.length
      );
    },
  };
  
  // Create questions
  var questions = [
    new Question(
      "The part of the lever that does the work is the .....",
      ["pulley", "fulcrum", "load", "effort"],
      "load"
    ),
    new Question(
      "What is the square of 16?",
      ["4", "25", "200", "256"],
      "256"
    ),
    new Question(
      "The movement of the earth round the sun is called .....",
      ["rotation", "revolution", "axix", "solar"],
      "revolution"
    ),
    new Question(
      "Christians gather in the church while traditional worshippers gather in the ....",
      ["mosque", "tent", "shrine", "village"],
      "Shrine"
    ),
    new Question(
      "One of the 4 stomachs of a ruminant animal is the ....",
      ["rumen", "yolk", "womb", "tissue"],
      "rumen"
    ),
      new Question(
      "Which of these is a vertebrate animal?",
      ["pidgeon", "snail", "crab", "butterfly"],
      "pidgeon"
    ),
  ];
  
  // Create quiz
  var quiz = new Quiz(questions);
  
  // Display Quiz
  QuizUI.displayNext();
  
