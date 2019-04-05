//question constructor
function Question(question, answers, answerID) {
    this.question = question,
        this.answers = answers,
        this.answerID = answerID

};
//array of questions
var questions = [];
var next;
var current;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 5;
var timer;

//set questions
questions[0] = new Question("How many flowers must honey bees visit to make one pound of honey?", [
    { id: "a1", text: "2,000,000" },
    { id: "a2", text: "1,000,000" },
    { id: "a3", text: "500,000" },
    { id: "a4", text: "1 but a lot of times" }
], "a1");
questions[1] = new Question("How far can a honey bee fly?", [
    { id: "a1", text: "1 mile" },
    { id: "a2", text: "1/2 mile" },
    { id: "a3", text: "1.5 miles" },
    { id: "a4", text: "6 miles" }
], "a4");
questions[2] = new Question("How much honey can a single honey bee produce in its lifetime?", [
    { id: "a1", text: "1/12 teaspoon" },
    { id: "a2", text: "1/8 teaspoon" },
    { id: "a3", text: "1/2 teaspoon" },
    { id: "a4", text: "1/2 tablespoon" }
], "a1");
questions[3] = new Question("How do honey bees communicate with each other?", [
    { id: "a1", text: "Smell" },
    { id: "a2", text: "Dance" },
    { id: "a3", text: "Sound" },
    { id: "a4", text: "All of the above" }
], "a4");
questions[4] = new Question("How long can a queen live?", [
    { id: "a1", text: "3 years" },
    { id: "a2", text: "5 years" },
    { id: "a3", text: "9 years" },
    { id: "a4", text: "12 years" }
], "a2");
questions[5] = new Question("What do drone honey bees do?", [
    { id: "a1", text: "Protect the hive" },
    { id: "a2", text: "Mate with the queen" },
    { id: "a3", text: "Take care of the larvae" },
    { id: "a4", text: "Clean the hive" }
], "a2");
questions[6] = new Question("How does a bee become queen?", [
    { id: "a1", text: "A larva is fed royal jelly" },
    { id: "a2", text: "A worker eats the previous queen" },
    { id: "a3", text: "A drone will pick a new queen" },
    { id: "a4", text: "There's an election (first past the post)" }
], "a1");
questions[7] = new Question("What do drones do in the winter?", [
    { id: "a1", text: "They hibernate in the hive" },
    { id: "a2", text: "They get chased out of the hive" },
    { id: "a3", text: "They take on new duties while the workers hibernate" },
    { id: "a4", text: "They offer their bodies as sustenance to the queen" }
], "a2");
questions[8] = new Question("How fast can a honey bee fly?", [
    { id: "a1", text: "5 mph" },
    { id: "a2", text: "10 mph" },
    { id: "a3", text: "15 mph" },
    { id: "a4", text: "20 mph" }
], "a3");
questions[9] = new Question("How many eggs can a queen lay per day in the summer?", [
    { id: "a1", text: "2500" },
    { id: "a2", text: "25000" },
    { id: "a3", text: "5000" },
    { id: "a4", text: "50000" }
], "a1");
questions[10] = new Question("Why do bees buzz?", [
    { id: "a1", text: "Angry bees buzz as a warning" },
    { id: "a2", text: "They use it for echolocation" },
    { id: "a3", text: "They can't help it" },
    { id: "a4", text: "A swarm of bees buzz together as an affirmation of kinship" }
], "a3");

$(document).ready(function () {
    //display the start screen
    startScreen();
    
    //starts the game
    function startGame() {
        next = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        time = 5;

        function addTimer(){
            var timer = $("<div>").attr("class","col-md-12 h3").text("Time Remaining: ");
            var time = $("<span>").attr("id","time");
            timer.append(time);
            $("#timer").append(timer);
        }
        addTimer();
        showQuestion(next);
    }


    //takes an index number, shows the current question
    function showQuestion(i) {
        resetTimer();
        startTimer();//start the timer
        current = questions[i]; //update the current question (saving this object for global use)
        $("#game").empty();
        $("#game").append(
            "<div class='row'><div id='question' class='col-md-12'>" + current.question + "</div></div>");

        loadAnswers(current); //load answers for the current question
        next++; //increment the next question (using as a counter)
        allowClicks();

    }
    //takes a questionObject, displays all possible answers as buttons
    function loadAnswers(questionObject) {
        var question = questionObject;
        //loop through items in the answers array
        for (var i = 0; i < question.answers.length; i++) {
            var answer = question.answers[i]; //save the current answer

            $("#game").append("<div class='row'><button id='" + answer.id + "' class='btn btn-outline-primary'>" + answer.text + "</button></div>");
        }
    }
    //add click listener to all buttons
    function allowClicks() {
        $(".btn").on("click", function () {
            stopTimer();
            //don't let user click other buttons after making a choice
            freezeClicks();
            checkAnswer(this);
        });
    }
    //remove click listener from buttons
    function freezeClicks() {
        $(".btn").off("click");
    }

    function nextMove() {
        stopTimer();
        if (next < questions.length) {
            setTimeout(function () {
                showQuestion(next);
            }, 1500);
        }
        else {//game is over
           setTimeout(function () {
                gameOver();
            }, 1500);
        }
    }
    //takes a button element, checks its ID against the correct answerID
    function checkAnswer(button) {
        var button = $(button);
        var correctAnswerID = current.answerID;
        var clickedButtonID = button.attr("id");
        //if the clicked answer is the same as the correct answer
        if (clickedButtonID == correctAnswerID) {
            correct++;
            showAnswer(correctAnswerID,button);
        }
        else {
            //show this answer as incorrect
            button.attr("class","btn btn-danger");
            //show the correct answer in green
            $("#" + current.answerID).attr("class", "btn btn-success");
            incorrect++;
            showAnswer(correctAnswerID,button,true);
        }
        nextMove();
    }

    function showAnswer(correctAnswerID,button,wrong){
        $("#"+correctAnswerID).attr("class","btn btn-success").prepend(bubble("<i class='fas fa-check fa-3x'></i>","correct"));
        if(wrong){
            $(button).attr("class","btn btn-danger").append(bubble("<i class='fas fa-times fa-3x'></i>","wrong"));
        }
    }

    function bubble(message, style) {
       var bubble = $("<div>").attr("class","bubble "+style).html(message);
        return bubble;
    }
    //ends the game
    function gameOver() {
        //clear the game area
        $("#timer").empty();
        $("#game").empty();
        //show correct, incorrect, unanswered
        $("#game").append(makeDiv("Correct: "+correct)).append(makeDiv("Incorrect: "+incorrect)).append(makeDiv("Unanswered: "+unanswered));

        //make a replay button
        var restart = $("<button>").attr("class","btn btn-success").text("Play Again");
        $("#game").append(restart);

        //add a click listener to the replay button
        restart.on("click", function(e){
           //when clicked, go back to start screen
            startScreen();
        });
    }
    //counts down the timer
    function countdown() {
        time--;
        $("#time").text(time);
        //if timer hits 0, didn't answer in time
        if (time == 0) {
            unanswered++;
            // say("Time's up!");
            showAnswer(current.answerID);
            stopTimer();
            nextMove();//progress to text question
        }
    }

    //start the timer
    function startTimer() {
        timer = setInterval(countdown, 1000);
    }

    //stop the timer
    function stopTimer() {
        clearInterval(timer);
    }

    //reset the timer
    function resetTimer() {
        time = 5;
        $("#time").text(time);
    }

    function makeDiv(content){
        return "<div>"+content+"</div>"
    }

    //screen shown before game starts
    //includes INSTRUCTIONS and a START BUTTON
    function startScreen(){
        //clear the screen
        $("#game").empty();
        $("#timer").empty();

        //show the instructions
        var instructions = $("<p>").text("Test your bee knowledge! Select your answers before time's up, and see how much you know about everyone's favorite animal.");
        var startButton = $("<button>").attr("id","start").attr("class","btn btn-success").text("Start");
        $("#game").append(instructions).append(startButton);

        //add a listener for the start button
        $("#start").on("click", function () {
            startGame();//start game on click
        });
    }

});