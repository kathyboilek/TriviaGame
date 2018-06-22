// What quiz questions to use
var questions = [{
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

var questionsArray = [questions.question];
var choicesarray = [questions.choices];
var answerarray = [questions.correctAnswer];
var currentQuestion;
//variable for counting how many player answered correct
var correct;
//counting how many player answered incorrect
var incorrect;
//how many the player skipped without answering
var unanswered;
//for the program to refer if the question was answered
var answered;
//player selection
var playerSelection;
//time until answer marked as unanswered
var timer;
//clock
var clock;
var seconds;

// Count will keep track of the index of the currently displaying picture.
var count = 0;

// TODO: Use jQuery to run "startSlideshow" when we click the "start" button.
$("#start-overbtn").hide();
$("#startbtn").on('click', function(){
    $(this).hide();
    startGame();
});

$("#start-overbtn").on('click', function(){
    $(this).hide();
    startGame();
});

function startGame(){
    $("#finalMessage").empty();
    $("#correctAnswers").empty();
    $("#incorrectAnswers").empty();
    $("#unanswered").empty();
    correct = 0;
    incorrect = 0;
    currentQuestion = 0;
    unanswered = 0;
    nextquestion();
}

function nextquestion(){
    $("#message").empty();
    $(".choiceSelected").empty();
    answered = true;
    $("#currQuestion").html("<h3> Question " + (currentQuestion+1) + '/' + questions.length);
    $(".questions").html("<p>" + questions[currentQuestion].question + "</p>");
    for (var i = 0; i < 4; i++){
        var choices = $("<div>");
        choices.text(questions[currentQuestion].choices[i]);
        choices.attr({'data-index': i});
        choices.addClass('thisChoice');
        $('.choices').append(choices);
        
    }
    responseTime();
    $('.thisChoice').on('click', function(){
        playerSelection = $(this).data('index');
        clearInterval(timer);
        answered = true;
        answerpage();
    });
}

function responseTime(){
    seconds = 15;
    $("#clock").html("<h3>Time Remaining: " + seconds + "</h3>");
    answered = true;
    timer = setInterval(showResponseTime, 1000);
}

function showResponseTime(){
    seconds--;
    $("#clock").html("<h3>Time Remaining: " + seconds + "</h3>");
    if( seconds < 1){
        clearInterval(timer);
        answered = false;
        answerpage();
    }
}
function answerpage(){
        $("#currQuestion").empty();
        $('.thisChoice').empty();
        $(".questions").empty();
    
        var correctAnswer = questions[currentQuestion].choices[questions[currentQuestion].correctAnswer];
        var correctAnswerIndex = questions[currentQuestion].correctAnswer;
    
        if((playerSelection == correctAnswerIndex) && (answered == true)){
            correct++;
            $("#message").html("<h3> Correct! </h3>" );
        }
        else if((playerSelection != correctAnswerIndex) && (answered == true)){
            incorrect++;
            $("#message").html("<h3> Incorrect! </h3>");
            $(".choiceSelected").html("<h3> The Correct Answer was: </h3>" + correctAnswer);
        }
        else {
            unanswered++;
            $("#message").html("Sorry you ran out of time!");
            $(".choiceSelected").html("The Correct Answer was: " + correctAnswer);
            answered = true;
        }
    
        if(currentQuestion == (questions.length-1)){
            setTimeout(results, 5000);
        }
        else {
            currentQuestion++;
            setTimeout(nextquestion, 5000);
        }
    }

function results(){
    $("#clock").empty();
    $("#message").empty();
    $(".choiceSelected").empty();
    $("#finalMessage").html("<h2> Trivia Questions Completed </h2>");
    $("#correctAnswers").html("Correct Questions: " + correct);
    $("#incorrectAnswers").html("Incorrect Questions: " + incorrect);
    $("#unanswered").html("Unanswered Questions: " + unanswered);
    $("#start-overbtn").show();
    $("#start-overbtn").html("Play Again!");
}