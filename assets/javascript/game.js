//global vars
//--------------------

//words used in game
var gameWords = ["weather", "clouds", "rain", "tornado", "sunny", "thunder", "snow", "climate", "meteorology", "hurricane", "haboob", "derecho", "virga", "sleet", "temperature", "dewpoint", "hail", "humidity", "lightning", "precipitation"];

//words computer selects
//var wordSelected = "";
var chosenWord = "";

//letters used in gameWords array
var lettersNeeded = [];


//letter blanks for corresponding word
var blanksShown = 0;


//number of guesses a player uses in a game
var guessesIncorrect = [];


//mix of solved letters and remaining blanks
var lettersAndBlanks = [];  //T _ _ _ _


//number of guesses people get
var guessesAllowed = 9;


//wins in the counter
var numberWins = 0;


//losses in the counter
var numberLosses = 0;


//functions to call on
//-----------------------

function startGame() {
  guessesAllowed = 9;

  wordSelected = gameWords[Math.floor(Math.random() * gameWords.length)];

  lettersNeeded = wordSelected.split("");

  blanksShown = lettersNeeded.length;

  //reset
  guessesAllowed = 9;
  lettersAndBlanks = [];
  guessesIncorrect = [];

  //put in right number of blanks
  for(var i = 0; i < blanksShown; i++) {
    lettersAndBlanks.push("_");
  }

  //change html to reflect round conditions
  document.getElementById("numberOfGuesses").innerHTML = guessesAllowed;

  document.getElementById("wordToGuess").innerHTML = lettersAndBlanks.join(" ");


  document.getElementById("incorrectGuesses").innerHTML = guessesIncorrect;

  document.getElementById("lossesSoFar").innerHTML = numberLosses;

  document.getElementById("winsSoFar").innerHTML = numberWins;



  //de-bugging
  console.log(wordSelected)

console.log(lettersNeeded);

console.log(blanksShown);

console.log(lettersAndBlanks);
}



function checkLetters(letter) {
  var isLetterInWord = false;

  for (var i = 0; i < blanksShown; i++) {
    if(wordSelected[i] === letter) {
      isLetterInWord = true;
    }
  }

  if (isLetterInWord) {
  for (var i = 0; i < blanksShown; i++) {
    if(wordSelected[i] === letter) {
      lettersAndBlanks[i] = letter;
    }
  }
}
  else {
    guessesIncorrect.push(letter);
    guessesAllowed --;
  }

  //update html for blanks and inn guesses...letter and blanks array instead of just blanks array

}

function roundComplete () {
  console.log("Win Count" + winsSoFar + "Loss Count" + lossesSoFar + "Guesses Left" + guessesAllowed);

  document.getElementById("numberOfGuesses").innerHTML = guessesAllowed;

// Prints the blanks at the beginning of each round in the HTML
document.getElementById("wordToGuess").innerHTML = lettersAndBlanks.join(" ");

// Clears the wrong guesses from the previous round
document.getElementById("incorrectGuesses").innerHTML = guessesIncorrect.join(" ");

  if (lettersNeeded.toString() === lettersAndBlanks.toString()) {
    numberWins ++;
    alert("Congratulations--you're weather-wise!");
    document.getElementById("winsSoFar").innerHTML = numberWins;
    startGame();
  }
  else if (guessesAllowed === 0) {
    numberLosses ++;
    alert("Sorry, you didn't get it. Try again");
  document.getElementById("lossesSoFar").innerHTML = numberLosses;
    startGame();
}
}

//main process
//-------------------------
startGame();

document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();
};

