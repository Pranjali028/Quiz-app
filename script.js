const questions = [
    {
        questions : "Which HTML tag is used to define the largest heading ?",
        answers : [
            {text: "h6", correct: false},
            {text: "h1", correct: true},
            {text: "head", correct: false},
            {text: "title", correct: false},
        ]
    },
    {
       questions : "Which CSS property is used to change the text size ?",
        answers : [
            {text: "font-size", correct: true},
            {text: "text-size", correct: false},
            {text: "size", correct: false},
            {text: "font", correct: false},
        ] 
    },
    {
       questions : "Which HTML element is used to insert a line break ?",
        answers : [
            {text: "break", correct: false},
            {text: "lb", correct: false},
            {text: "br", correct: true},
            {text: "line", correct: false},
        ] 
    },
    {
       questions : "Which property is used to change the background color ?",
        answers : [
            {text: "color", correct: false},
            {text: "bgcolor", correct: false},
            {text: "background-color", correct: true},
            {text: "background", correct: false},
        ] 
    },
    {
        questions : "Which symbol is used for single-line comments in JavaScript ?",
        answers : [
            {text: "!-- --", correct: false},
            {text: "//", correct: true},
            {text: "/* *//", correct: false},
            {text: "#", correct: false},
        ]
    },
    {
       questions : "Which method is used to write data to the console in JvaScript ?",
        answers : [
            {text: "print()", correct: false},
            {text: "log()", correct: false},
            {text: "console.log()", correct: true},
            {text: "document.write", correct: false},
        ] 
    },
    {
       questions : "Which property controls the space between element's border and content ?",
        answers : [
            {text: "margin", correct: false},
            {text: "padding", correct: true},
            {text: "border-spacing", correct: false},
            {text: "spacing", correct: false},
        ] 
    },
    {
        questions : "Which keyword is used to declare a constant in JavaScript ?",
        answers : [
            {text: "let", correct: false},
            {text: "var", correct: false},
            {text: "const", correct: true},
            {text: "define", correct: false},
        ]
    },
    {
        questions : "What will be the output of typeof [] in JavaScript ?",
        answers : [
            {text: "array", correct: false},
            {text: "object", correct: true},
            {text: "list", correct: false},
            {text: "undefined", correct: false},
        ]
    },
    {
        questions : "Which of the following is NOT a JavaScript data type ?",
        answers : [
            {text: "String", correct: false},
            {text: "Number", correct: false},
            {text: "Boolean", correct: false},
            {text: "Character", correct: true},
        ]
    },
];

const questionsElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionsElement.innerHTML = questionNo + "." + currentQuestion.
    questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showscore(){
    resetstate();
    questionsElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showscore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
