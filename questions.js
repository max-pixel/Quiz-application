var ques;
var correctScore = 0;
var wrongScore = 0;
var tempQuesArray;
var tempObj;
var count=120;
var time;
var easy=[
	{
		question:"What's your status?",
		questionType:1,
		choices:["Single","Committed","Complicated","I don't know","I don't give a damn"],
		correctChoice: "Single",
		score:10
	},
	{
		question:"Who was Jamie Lanister in the castle?",
		questionType:1,
		choices:["His girlfriend","Tyrion's girlfriend","Tywin's girlfriend","His sister","I don't give a damn"],
		correctChoice: "His sister",
		score:10
	},
	{
		question:"Do you like GOT?",
		questionType:2,
		correctChoice: "Yes",
		score:10
	},
	{
		question:"Is dil ka kya karoon?",
		questionType:1,
		choices:["Phek de","khishe me rakh","paani pe","I don't know","I don\'t give a damn"],
		correctChoice: "I don\'t give a damn",
		score:10
	},
	{
		question:"Dil aakhir tu kyu roota hai?",
		questionType:1,
		choices:["Ainvayi","Break up","Patch up","Web 1 homework","Tere baap ka kya jaata hai?"],
		correctChoice: "Ainvayi",
		score:10
	}
]
var hard=[
	
	{
		question:"Which of the following is the binary representation of 4 5/8?",
		questionType:1,
		choices:["110.101","100.101","10.011","100.11","I don't know"],
		correctChoice: "100.101",
		score:10
	},
	{
		question:"Which of the following bit patterns represents the value 5 in two’s complement notation?",
		questionType:1,
		choices:["11111011","00000101","11110011","00011010","I don't give a damn"],
		correctChoice: "00000101",
		score:10
	},
	{
		question:"Which of the following storage systems is best suited for storing and retrieving long strings of data that are processed in their sequential order?",
		questionType:1,
		choices:["Magnetic disk","Magnetic disk","Optical CDs and DVDs","Floppy","Pendrive"],
		correctChoice: "Optical CDs and DVDs",
		score:10
	},
	{
		question:"A digital circuit capable of holding a single digit",
		questionType:2,
		correctChoice: "Flip-flop",
		score:20
	},
	{
		question:"A major standardization organization within the United States",
		questionType:2,
		correctChoice: "ANSI",
		score:20
	}		
	
]
var category=[
	{
		qType: "easy",
		questions: easy
	},
	{
		qType: "hard",
		questions:hard
	}
]

function populate(){

var today = new Date();
	document.getElementById('date').innerHTML = today.getMonth()+ " / "+ today.getDate() + " / " + today.getFullYear();
	var titleIndex = Math.floor(Math.random()*category.length);
	var item = category[titleIndex];
	document.getElementById("subject").innerHTML = item.qType.toString();
}
function start(){
	if(document.getElementById("subject").innerHTML == "Quiz Application"){
		alert("Please chose a topic");
	}
	else{
		document.getElementById("choose").style.visibility='hidden';
		timedCount();
		traverse();
		document.getElementById("start").style.visibility='hidden';
	}

}
function catIndex(){

	var titleValue= $('#subject').html();	
	switch(titleValue){
		case "easy":
		return 0;
		break;

		case "hard":
		return 1;
		break;
	}
}
function traverse(){
	

	var categoryIndex = catIndex();									
	tempQuesArray = category[categoryIndex].questions;				
	if(tempQuesArray.length == 1){
			document.getElementById("next").remove();
			document.getElementById("submit").style.visibility='visible';
	}
	tempObj = tempQuesArray.pop();								
	answer = tempObj.correctChoice;									
	
	document.getElementById("question").innerHTML = tempObj.question.toString();  
	if(tempObj.questionType == 2){
    // code for handling text buttons
            $("#answer").html('<label>Answer : </label>' +
            '<input type="text" name="textbox" id="answerText" value="" >');
	}
	else if (tempObj.questionType == 1){y 
       	var choicesHtml="";
       	var currentQuestion = 0;
        var i;

        for (i = 0; i < tempObj.choices.length; i++) 
            {
                choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
                "' class='choice' value='" + tempObj.choices[i] + "'>" +						
                " <label for='choice'>" + tempObj.choices[i] + "</label><br>";
                document.getElementById("answer").innerHTML = choicesHtml;
            } 
	}
}
function updateScore(){

	//document.getElementById("temp").innerHTML = tempObj.correctChoice.toString();
	if(tempObj.questionType == 2){
    	if(document.getElementById("answerText").value == tempObj.correctChoice.toString()){			
    			correctScore = correctScore + tempObj.score;
    			document.getElementById("rightScore").innerHTML = correctScore; 
    	}
    	else{
    		wrongScore += 1;
    		document.getElementById("wrongScore").innerHTML = wrongScore; 	
    	}
	}
	else if (tempObj.questionType == 1){       		
    $(".choice").each(function() {
        if($(this).is(':checked')){      	
        	if($(this).val() == tempObj.correctChoice.toString()){
        		correctScore = correctScore + tempObj.score;
    			document.getElementById("rightScore").innerHTML = correctScore; 		
        	}
        	else{
        	wrongScore = wrongScore + 1;
    		document.getElementById("wrongScore").innerHTML = wrongScore;		
        	}
        }
    });

	}	
		traverse();
}
function displayNext(){
	updateScore();
}	
function stopCount()
{
	clearTimeout(time);
}
function timedCount()
{
	document.getElementById('timer').innerHTML=count;
	count=count-1;
	if(count==0)
	{

		alert("time over");
		submit();
		stopcount();
	}
	
	time=setTimeout("timedCount()",1000);
}
function submit(){

	
	document.getElementById("question").style.visibility='hidden';
	document.getElementById("answer").style.visibility='hidden';
	document.getElementById("displayScore").style.visibility='visible';
	document.getElementById("displayScore").innerHTML="Your score: "+document.getElementById("rightScore").innerHTML;
	stopCount();
	
}

function quit(){
	var x;
	if(document.getElementById("subject").innerHTML != "Quiz Application"){
	    if (confirm("Press a button!") == true) {
    		submit();
    	}
	}
}