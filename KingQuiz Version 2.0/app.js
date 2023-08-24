const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const explanationBox = document.querySelector(".explanation-box");
const explanationText = document.querySelector(".explanation-text")

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOption = [];
let correctAnswers=0;
let attempt = 0;


function setAvailableQuestion(){
    const totalQuestion = 10;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
   
}



function getNewQuestion(){
    explanationBox.classList.remove("hide");
    optionContainer.innerHTML = '';
    let animationDelay = 0.1;
    questionNumber.innerHTML = " Question " + (questionCounter + 1) + " of " +  "5";
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1, 1);
    const optionLen = currentQuestion.options.length   //CurrentQuestion have been randomly selected, mark currentQuestio its option and length
    for(let i=0; i<optionLen; i++){                  
        availableOption.push(i)                       //If the length is 4, availableOption is 4 and the option of CurrentQuestion is marked

    }
    for(let i=0; i<optionLen; i++){
        const optionIndex = availableOption[Math.floor(Math.random() * availableOption.length)];
        const index2 = availableOption.indexOf(optionIndex);
        availableOption.splice(index2,1)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id= optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.1;
        option.className = "option";
        optionContainer.appendChild(option);    //rearrange their position   //Random select from 1 to 4 and remove them from the availableOption
        option.setAttribute("onClick", "getResult(this)");
   
    }
    console.log(currentQuestion)
    questionCounter++

}

function getResult(element){
  explanationBox.classList.remove("hide");
  const id = parseInt(element.id);
  if(id === currentQuestion.answer){
    
      element.classList.add("correct");
      updateAnswerIndicator("correct");
      correctAnswers++
  }
  else{
    updateAnswerIndicator("wrong");
     element.classList.add("wrong")
     const optionLen = optionContainer.children.length;
     for(let i=0; i<optionLen; i++){
        if(parseInt(optionContainer.children[i].id)=== currentQuestion.answer){
            optionContainer.children[i].classList.add("correct")
        }
     }
  }
  getExplanation();
  attempt++
  unclickableOptions();
}

function getExplanation(){
    explanationBox.querySelector(".questionExplanation").innerHTML = currentQuestion.e;
}

function unclickableOptions(){
   const optionLen = optionContainer.children.length;
   for(let i=0; i<optionLen; i++){   //TO see how many children to add already-answered 
    optionContainer.children[i].classList.add("already-answered");
   }
}

function answerIndicator(){
    answerIndicatorContainer.innerHTML="";
    const totalQuestion = 5;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div")
        answerIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType)
}



function next(){
    if(questionCounter===5){
        console.log("quiz over")
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
    explanationBox.classList.add("hide");

}
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = questionCounter;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const Npercentage = (correctAnswers/questionCounter)*100;
    resultBox.querySelector(".percentage").innerHTML = Npercentage.toFixed() + '%';
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionCounter;
    if(correctAnswers>2){
        resultBox.querySelector(".celebration").innerHTML = '"Sucess is not final : It is the courage to continue that counts." -Winston Churchill'
        resultBox.querySelector(".celebration2").innerHTML = '"Well done and keep doing even better!" -King William'
    }
    else{
        resultBox.querySelector(".celebration").innerHTML = '"failure is not fatal : It is the courage to continue that counts." -Winston Churchill'
        resultBox.querySelector(".celebration2").innerHTML = '"Cheer up and do better next time!" -King William'
    }
}

function resetQuiz(){
     questionCounter = 0;
     correctAnswers=0;
     attempt = 0;

}



function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    resultBox.classList.add('hide');
    homeBox.classList.remove("hide");
    resetQuiz();
}

function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestion();
    getNewQuestion();
    answerIndicator();
}

window.onload = function(){
   homeBox.querySelector(".total-question").innerHTML = 5
}


