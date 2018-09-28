// returns a number between a given min and max range
function getRandomNumber(min, max) {
  // finds a random number and changes it from decimal to integer
  return parseInt(Math.random() * (max - min) + min)
};
// declares variables min, max, answer
var min,
    max,
    answer;
// retrieves text input field with and id="guess" and assigns to variable
var guessField = document.getElementById("guess")
// retrieves button tag with id="clear" and assigns to variable
var clear = document.getElementById("clear")
// retrieves button tag with id="guess-button" and assigns to variable
var guessButton = document.getElementById("guess-button")
// retrieves div tag with id="your-last" and assigns to variable
var yourLast = document.getElementById("your-last")
// retrieves div tag with id="your-last" and assigns to variable
var recent = document.getElementById("recent")
// retrieves div tag with id="message" and assigns to variable
var messageField = document.getElementById("message")
// retrieves button tag with id="reset" and assigns it to variable
var reset = document.getElementById("reset")
// makes sure that reset is disabled at the beginning of game
reset.disabled = true;

// adds event listener to the text field that runs a function on a keyup event
guessField.addEventListener("keyup", function() {
  // run beneath code if the text field is empty
  if (guessField.value === "") {
    // if empty disable the guess and clear buttons
    clear.disabled = true;
    guessButton.disabled = true;
  } else {
    // if text field is empty clear and disable buttons are active
    clear.disabled = false;
    guessButton.disabled = false;
  }
})

// add event listener to the clear button that runs function on click event
clear.addEventListener("click", function() {
  // run code beneath if guess field is not empty
  if ( guessField.value !== "" ) {
    // set the guess field to an empty string
    guessField.value = "";
    // disable clear and guess button since field will now be empty
    guessButton.disabled = true;
    clear.disabled = true;
  }
});

// add event listener to reset button that runs a function on click event
reset.addEventListener("click", function() {
  // assign min and max fields values to 1 and 100
  document.getElementById("min").value = 1
  document.getElementById("max").value = 100
  // clear the winner text from the winner div
  document.getElementById("winner").innerHTML = "";
  // generate a new answer
  answer = getRandomNumber(min - 10, max + 10)
  // clear text from all the divs that display messages about guesses
  yourLast.innerHTML = "";
  recent.innerHTML = "";
  messageField.innerHTML = "";
  // puts the value 'Enter Your Guess' back in the text field
  guess.value = "Enter Your Guess";
  // disable the reset button since there is nothing to reset
  reset.disabled = true;
})

// add event listener to guess button that runs function on button click
guessButton.addEventListener("click", function() {
  // display text in yourLast div that says 'your last guess was'
  yourLast.innerHTML = "Your last guess was";
  // clear the text from the winner div
  document.getElementById("winner").innerHTML = "";
  // grab value from the min and max text field, number string parses to integer
  min = parseInt(document.getElementById("min").value);
  max = parseInt(document.getElementById("max").value);
  // grab value from guess text field and parse it to an integer
  // if not an integer parseInt will return NaN to var guess
  var guess = parseInt(document.getElementById("guess").value)
  // generates new answer if no answer has been defined
  // or if the answer is outside of the current possible range
  if (typeof answer === "undefined" || answer < min || answer > max ) {
    answer = getRandomNumber(min, max)
  }
  // defines message variable
  var message;
  // assigns error message to message variable if guess is out of range
  if (guess < min || guess > max ) {
    message = `That is not a number between ${min} and ${max}. Try again`
  // assigns message if guess is higher than answer
  } else if (guess > answer) {
    message = "That is too high"
  // assigns message if guess is lower than answer
  } else if (guess < answer) {
    message = "That is too low"
  // executes code if guess is strictly equal to the answer
  } else if (guess === answer) {
    // assigns winning message to message variable
    message = "BOOM! You got that one.";
    // changes min and max value to be 10 less and 10 more respectively
    document.getElementById("min").value = min - 10
    document.getElementById("max").value = max + 10
    // creates new answer that is within the new min and max
    answer = getRandomNumber(min - 10, max + 10)
    // gives new winner text to the winner div
    document.getElementById("winner").innerHTML = `Now pick an number between ${min - 10} and ${max + 10}`
  } else {
    // puts text into yourLast div that tells user the input was not a number
    yourLast.innerHTML = "Your last guess was not a number";
    // clears the guess variable
    guess = ""
    // assigns 'please try again' to message variable
    message = "Please Try Again."
  }
  // fills recent div with whatever string is assigned to the guess variable
  recent.innerHTML = guess;
  // fills messageField div with whatever string has been assigned to message
  messageField.innerHTML = message;
  // disable reset button because the game has changed it's original state
  reset.disabled = false;
})
