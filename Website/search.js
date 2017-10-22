var MAX_ATTRIBUTE_SCORE = 4;
var ALLOWED_VARIANCE = 70;
var HUNDRED_PERCENT = 100;
var findSimilarPartner = false;
var percentage = 0;

userOneInfo = [];


function findDif() {
	//findSimilarPartner = false;
	localStorage.setItem("findSimilarPartner", false);
}

function findSame() {
	//findSimilarPartner = true;
	localStorage.setItem("findSimilarPartner", true);
}


function report() {

	var arr = document.getElementsByName("type");

	arr.forEach(function(elem){
	if (elem.checked) {
		userOneInfo.push(elem);     
	}
	})

	if(localStorage.getItem("findSimilarPartner") == false) {
		percentage = algorithm(userOneInfo, MAX_ATTRIBUTE_SCORE, arr);	
	}
	else {
		percentage = HUNDRED_PERCENT - algorithm(userOneInfo, MAX_ATTRIBUTE_SCORE, arr);
	}

	var matchRating = "";
	if(percentage >= ALLOWED_VARIANCE) {
		matchRating += "You match ";
	}
	else {
		matchRating += "You don't match ";
	}
	matchRating += "with user two based on your preferences by "
	matchRating += percentage;
	matchRating += " percent!";

	var old = document.body.innerHTML;
	document.body.innerHTML = "";
	var results = document.createElement("h1");
	results.id="results";
	var message = document.createTextNode(matchRating);
	results.appendChild(message);

	document.body.appendChild(results); //(clears all content from page)
	var div = document.createElement("div");
	div.id = "buttondiv";
	var btn = document.createElement("button");
	var btntext = document.createTextNode("back");
	btn.appendChild(btntext)
	div.appendChild(btn);
	document.body.appendChild(div);
	btn.onclick = function(){
	document.body.innerHTML = old;
	}
	//var check = document.getElementsByID("results");
	//console.log(check);

}

// Returns the difference percentage for user one and user two
function algorithm(userOneInfo, maxAttributeScore, arr) {

	var numOfAttributes = userOneInfo.length;
	var difference = 0;

	// loop through arr to search for the attributes chosen by the user
	for(var i = 0; i < numOfAttributes; i++) {
		
		
		var attribute = userOneInfo[i];

		//sconsole.log(attribute);
		//console.log(userOne[attribute.value]);
		var score1 = userOne[attribute.value].summary.score;
		var score2 = userTwo[attribute.value].summary.score;

		console.log(score1, score2);
		// calculate the difference
		difference += Math.abs(score1 - score2);

	}
	

	var differencePercentage = difference/(numOfAttributes * maxAttributeScore) * HUNDRED_PERCENT;
	differencePercentage = parseFloat(Math.round(differencePercentage * 100) / 100).toFixed(2);
	return differencePercentage;
}









