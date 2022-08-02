var viewHighScores = document.querySelector("#viewHighScores");
var timer = document.querySelector("#timer");
var timeLeft = 75;

var homepage = document.querySelector("#homepage");
var start = document.querySelector("#start");

var questionList = document.querySelector("#questionList");
var nextQuestion = document.querySelector("#nextQuestion");
var any = document.querySelectorAll(".any");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var rightOrWrong = document.querySelector("#rightOrWrong");
var questionNum = 0;

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },
];

var scoreBox = document.querySelector("#scoreBox");
var gameOver = document.querySelectorAll("#gameOver");
var myScore = document.querySelector("#myScore");
var initials = document.querySelector("#initials");
var submitScore = document.querySelector("#submitScore");

var highScoresList= document.querySelector("#highScoresList");
var highScores= document.querySelector("#highScores");
var goBack= document.querySelector("#goBack");
var reset= document.querySelector("#reset");

function quizTimer() {
    var timerCount = setCount(function () {
        timeLeft--;
        timer.innerText = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerCount);
            timer.innerText = 0;
            gameOver.innerText = "Time's up!";
            gameEnd();
        } else if (questionNum >= questions.length) {
            clearInterval(timerCount);
            gameEnd();
        }
    }, 1000);
}

function showQuestion(num) {
    nextQuestion.innerText = questions[num].question;
    answer1.innerText = questions[num].choices[0];
    answer2.innerText = questions[num].choices[1];
    answer3.innerText = questions[num].choices[2];
    answer4.innerText = questions[num].choices[3];
    questionNum = num;
}


function startQuiz() {
    homepage.style.display = "none";
    questionList.style.display = "block";
    quizTimer();
    showQuestion(questionNum);
}

function checkAnswer(event) {
    event.preventDefault();
    //Display correct or wrong
    rightOrWrong.style.display = "block";
    //Will display correct or wrong for one second and then go away
    setTimeout(function () {
        rightOrWrong.style.display = 'none';
    }, 1000);

    // If correct, display correct and add 5 to the user's score
    if (questions[questionNum].answer == event.target.textContent) {
        rightOrWrong.innerText = "Correct!";

        // Remove 15 seconds from the timer and display wrong
    } else {
        timeLeft = timeLeft - 20;
        rightOrWrong.innerText = "Wrong!";
    }
    //If not all questions have been displayed, then display next question
    if (questionNum < questions.length - 1) {
        showQuestion(questionNum + 1);
    } else {
        gameEnd();
    }
}

function gameEnd() {
    questionList.style.display = "none";
    scoreBox.style.display = "block";
    myScore.innerText = `Your final score is: ${timeLeft}`
    timer.style.display = "none";
};

function getScores() {
    var scoreList = localStorage.getItem("ScoreList");
    if (scoreList !== null) {
        let currentList = JSON.parse(scoreList);
        return currentList;
    } else {
        currentList = [];
    }
    return currentList;
};

function showScore() {
    highscoresList.innerHTML = "";
    highscoresList.style.display = "block";
    let highScores = rankScores();
    for (let i = 0; i < topScores.length; i++) {
        var topScore = topScores[i];
        let newLi = document.createElement("li");
        newLi.innerText = `${topScore.user} - ${topScore.score}`;
        highscoreList.appendChild(newLi);
    }
};

function rankScores() {
    var scores = getScores();
    if (getScores == null) {
        return;
    } else {
        scores.sort(function (a, b) {
            return b.score - a.score;
        })
        return scores;
    }
};

function saveScore() {
    var newHighInfo = {
        user: initials.value,
        score: totalScore
    }
    var scoreInfo = getScores();
    scoreInfo.push(newHighInfo);
    localStorage.setItem("ScoreList", JSON.stringify(scoreInfo));

}

start.addEventListener("click", startQuiz);

any.forEach(function (event) {
    event.addEventListener("click", checkAnswer);
});

goBack.addEventListener("click", function (event) {
    event.preventDefault();
    homepage.style.display = "block";
    questionList.style.display = "none";
    scoreBox.style.display = "none";
    highScoresList.style.display = "none";
    location.reload();
});

submitScore.addEventListener("click", function (event) {
    event.preventDefault();
    homepage.style.display = "none";
    questionList.style.display = "none";
    scoreBox.style.display = "none";
    highScoresList.style.display = "block";
    saveScore();
    showScore();
});

viewHighScores.addEventListener("click", function (event) {
    event.preventDefault();
    homepage.style.display = "none";
    questionList.style.display = "none";
    scoreBox.style.display = "none";
    highScoresList.style.display = "block";
    showScore();
});

reset.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    showScore();
});