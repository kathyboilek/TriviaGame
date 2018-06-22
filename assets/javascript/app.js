// What quiz questions to use
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
// var index = 0;
// var countdownTimer = {
//     time : 30,
//     reset: function() {
//         this.time = 30;
//         $('.timer').html('<p>' + this.time + ' seconds remaining</p>');
//     },
//     start: function() {
//         counter = setInterval(countdownTimer.count, 1000);	
//     },
//     stop: function() {
//         clearInterval(counter);
//     },
//     count: function() {
//             countdownTimer.time--;
//             console.log(countdownTimer.time);
//         if (countdownTimer.time >= 0) {
//             $('.timer').html('<p>' + countdownTimer.time + ' seconds remaining</p>');
//         }
//         else {
//             index++;
//             answerWrong();
//             countdownTimer.reset();
//             if (index < triviaQuestions.length) {
//                 loadQuestion(index);
//             } else {
//                 $("input[type='radio']:checked").hide();
//                 showScore();
//             }
//         }
//     }
// };


// Function to start countdown
function run(){
    counter = setInterval(decrement, 1000);
}

// Function to stop countdown
function stop(){
clearInterval(counter);
}

// Function to display time left on the screen and check if coundtown is 0
function decrement(){
    number--;
    
    $("#timerleft").html('<h2>' + number + " seconds"+'</h2>');
    
    if (number === 0){
        stop();
        $("#time-up-message").html("Time Up!");
        checkAnswers();
    }
}

$(document).ready(function () { 

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // Click to display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {
            value = $("input[type='radio']:checked").val();
            if (value == undefined) {
                $(document).find(".quizMessage").text("You haven't selected an answer yet");
                $(document).find(".quizMessage").show();
            } else 
            {
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
            // countdownTimer.reset();
            displayCurrentQuestion();
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
    // countdownTimer.stop();
    // $('.timer').empty();
}

function hideScore() {
    $(document).find(".result").hide();
}
});
