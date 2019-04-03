//question constructor
function Question(question, answers, answerID){
    this.question = question,
    this.answers = answers,
    this.answerID = answerID

};
//array of questions
var questions = [];
var next;
var current;
//set questions
questions[0] = new Question("How many flowers must honey bees visit to make one pound of honey?",[
    {id: "a1", text:"2,000,000"},
    {id: "a2", text:"1,000,000"},
    {id: "a3", text:"500,000"},
    {id: "a4", text: "1 but a lot of times"}
],"a1");
questions[1] = new Question("How far can a honey bee fly?",[
    {id: "a1", text: "1 mile"},
    {id: "a2", text: "1/2 mile"},
    {id: "a3", text: "1.5 miles"},
    {id: "a4", text: "6 miles"}
], "a4");
questions[2] = new Question("How much honey can a single honey bee produce in its lifetime?",[
    {id: "a1", text: "1/12 teaspoon"},
    {id: "a2", text: "1/8 teaspoon"},
    {id: "a3", text: "1/2 teaspoon"},
    {id: "a4", text: "1/2 tablespoon"}
], "a4");
questions[3] = new Question("How do honey bees communicate with each other?",[
    {id: "a1", text: "Smell"},
    {id: "a2", text: "Dance"},
    {id: "a3", text: "Sound"},
    {id: "a4", text: "All of the above"}
], "a4");
questions[4] = new Question("How long can a queen live?",[
    {id: "a1", text: "3 years"},
    {id: "a2", text: "5 years"},
    {id: "a3", text: "9 years"},
    {id: "a4", text: "12 years"}
], "a2");
questions[5] = new Question("What do drone honey bees do?",[
    {id: "a1", text: "Protect the hive"},
    {id: "a2", text: "Mate with the queen"},
    {id: "a3", text: "Take care of the larvae"},
    {id: "a4", text: "Clean the hive"}
], "a2");
questions[6] = new Question("How does a bee become queen?",[
    {id: "a1", text: "A larva is fed royal jelly"},
    {id: "a2", text: "A worker eats the previous queen"},
    {id: "a3", text: "A drone will pick a new queen"},
    {id: "a4", text: "There's an election (first past the post)"}
], "a1");
questions[7] = new Question("What do drones do in the winter?",[
    {id: "a1", text: "They hibernate in the hive"},
    {id: "a2", text: "They get chased out of the hive"},
    {id: "a3", text: "They take on new duties while the workers hibernate"},
    {id: "a4", text: "They offer their bodies as sustenance to the queen"}
], "a2");
questions[8] = new Question("How fast can a honey bee fly?",[
    {id: "a1", text: "5 mph"},
    {id: "a2", text: "10 mph"},
    {id: "a3", text: "15 mph"},
    {id: "a4", text: "20 mph"}
], "a3");
questions[9] = new Question("How many eggs can a queen lay per day in the summer?",[
    {id: "a1", text: "2500"},
    {id: "a2", text: "25000"},
    {id: "a3", text: "5000"},
    {id: "a4", text: "50000"}
], "a1");
questions[10] = new Question("Why do bees buzz?",[
    {id: "a1", text: "Angry bees buzz as a warning"},
    {id: "a2", text: "They use it for echolocation"},
    {id: "a3", text: "They can't help it"},
    {id: "a4", text: "A swarm of bees buzz together as an affirmation of kinship"}
], "");


reset();
  

function reset(){
    next = 0;
    showQuestion(next);
}

//takes an index number, shows the current question
function showQuestion(i){
    current = questions[i]; //update the current question (saving this object for global use)
    $("#question").text(current.question); //set text in page
    loadAnswers(current); //load answers for the current question
    next++; //increment the next question (using as a counter)
}

//takes a questionObject, displays all possible answers as buttons
function loadAnswers(questionObject){
    var question = questionObject;
    //loop through items in the answers array
    for(var i = 0; i < question.answers.length; i++){
        var answer = question.answers[i]; //save the current answer
        $("#"+answer.id).text(answer.text).removeClass("btn-danger").removeClass("btn-success").addClass("btn-outline-primary");//add text to document
    }
}

//add click listener to all buttons
$(".btn").on("click",function(){
    //check answer when button is clicked
    if(next < questions.length){
        checkAnswer(this);
    }
    else{
        if(confirm("Play again?")){
            reset();
        }
        else{
            alert("Fine.");
        }
    }
   
});

//takes a button element, checks its ID against the correct answerID
function checkAnswer(button){
    var button = $(button);

    //if the clicked answer is the same as the correct answer
    if (button.attr("id") == current.answerID){
        //show correct answer in green
        button.removeClass("btn-outline-primary").addClass("btn-success");
    }
    else{
        //show this answer as incorrect
        button.removeClass("btn-outline-primary").addClass("btn-danger");
        //show the correct answer in green
        $("#"+current.answerID).removeClass("btn-outline-primary").addClass("btn-success");
    }
    setTimeout(function(){
        showQuestion(next);
    },1500);
}
