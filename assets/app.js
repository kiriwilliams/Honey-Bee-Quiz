//question constructor
function Question(question, answers, answerID){
    this.question = question,
    this.answers = answers,
    this.answerID = answerID

};
//array of questions
var questions = [];
//set questions
questions[0] = new Question(
    "How many flowers must honey bees visit to make one pound of honey?", 
    [{id: "a1", text:"2,000,000"},
    {id: "a2", text:"1,000,000"},
    {id: "a3", text:"500,000"},
    {id: "a4", text: "1 but a lot of times",}
],"a1");
loadAnswers(questions[0]);
//
function loadAnswers(questionObject){
    var question = questionObject;

    for(var i = 0; i < question.answers.length; i++){
        var answer = question.answers[i];
        $("#"+answer.id).text(answer.text);
    }

}
