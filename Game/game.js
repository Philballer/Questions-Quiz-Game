const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBar = document.querySelector("#progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    },
    {
        question: " What does CSS stand for??",
        choice1: "Coding Syntax Scource",
        choice2: "Cascaded Style Sheet",
        choice3: "Cascade Source Sheet",
        choice4: "Clear Source Sheet",
        answer: 2
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    console.log(availableQuesions)
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //Ending the game
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/End/end.html");
    }
    //question counter part
    questionCounter++;
    progressText.innerText = ` Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update progress bar
    let percent = (questionCounter/MAX_QUESTIONS) * 100;
    console.log(percent);
    progressBar.style.width = `${percent}%`;
    
    const randomIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[randomIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(randomIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers= false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        //adding the incremnt score with max bonus
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        
        // ading classlist
        selectedChoice.parentElement.classList.add(classToApply);
        
        //delay in the removal of classlist
        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 500);
        

    });
});

//adding score function
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};


startGame();
