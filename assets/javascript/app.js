var triviaQuestions = [{
    question: "What famous role did both Cary Grant and Noel Coward reject?",
    choices: ["James Bond", "Rhett Buttler", "Gordon Gekko", "Vito Corleone"],
    correctAnswer: 0
}, {
    question: "Which was the last feature film of screen legend Paul Newman, which was also the highest grossing movie of his career?",
    choices: ["Absence of Malice", "Cars", "Cool Hand Luke", "Butch Cassidy and the Sundace Kid"],
    correctAnswer: 1

}, {
    question: "Which British actor has adopted a unique voice or accent for each character he has played? Hint: He is a supporting character in a famous super-hero film series.",
    choices: ["Ralph Fiennes", "Anthony Hopkins", "Daniel Craig", "Gary Oldman"],
    correctAnswer: 3

}, {
    question: "What actor was known as Singing Sandy early in his career?",
    choices: ["John Travolta", "John Wayne", "Sandy Saddler", "Sandy Koufax"],
    correctAnswer: 1

}, {
    question: "In the Harry Potter film franchise, what does the Hogwarts motto 'Draco dormiens nunquam titillandus' mean?",
    choices: ["Never tickle a sleeping dragon", "Great men are not born great, they grow great.", "What we do in life echoes in eternity", "It is not our abilities that show what we truly are. It is our choices."],
    correctAnswer: 0

}, {
    question: "What car did Caractacus Potts drive?",
    choices: ["DeLorean", "Love Bug", "Chitty Chitty Bang Bang", "Aston Martin"],
    correctAnswer: 2

}, {
    question: "In the first two Jaws film, what was the police chiefs name?",
    choices: ["John Book", "Scott Turner", "Martin Brody", "Matt Cordell"],
    correctAnswer: 2

}, {
    question: "In the movie Star Wars, what is the Emperors last name?",
    choices: ["Aurelius", "Commodus", "Sidious", "Palpatine"],
    correctAnswer: 3
}

];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var timer = 20;
var timerOn = false;
var timerId = '';


$(document).ready(function () { // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', triviaQuestions.startGame);
    $(document).on('click' , '.option', triviaQuestions.guessChecker);
    
  })


    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    $('#game').show();
    
    //  empty last results
    $('#results').html('');
    
    // show timer
    $('#timer').text(trivia.timer);
    
    // remove start button
    $('#start').hide();

    $('#remaining-time').show();
    
    // ask first question
    trivia.nextQuestion();
    
  
    // Click to display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("You haven't selected an answer yet");
                $(document).find(".quizMessage").show();
            } else {
                // Remove any message 
                $(document).find(".quizMessage").hide();

                if (value == triviaQuestions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                currentQuestion++; 
                if (currentQuestion < triviaQuestions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Would you like to play again?");
                    quizOver = true;
                }
            }
        } else { 
            // quiz is over, click the next button
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });


// This displays the current question AND the choices
function displayCurrentQuestion() {

    var question = triviaQuestions[currentQuestion].question;
    var questionClass = $(document).find(".triviaContainer > .question");
    var choiceList = $(document).find(".triviaContainer > .choiceList");
    var numChoices = triviaQuestions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = triviaQuestions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".triviaContainer > .result").text("You scored: " + correctAnswers + " out of: " + triviaQuestions.length);
    $(document).find(".triviaContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}