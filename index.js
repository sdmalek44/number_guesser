function getRandomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min)
};
var min;
var max;
var answer;
var guessField = document.getElementById("guess")
var clear = document.getElementById("clear")
var guessButton = document.getElementById("guess-button")
var yourLast = document.getElementById("your-last")
var recent = document.getElementById("recent")
var messageField = document.getElementById("message")
var reset = document.getElementById("reset")
reset.disabled = true;

guessField.addEventListener("keyup", function() {
  if (guessField.value === "") {
    clear.disabled = true;
    guessButton.disabled = true;
  } else {
    clear.disabled = false;
    guessButton.disabled = false;
  }
})

clear.addEventListener("click", function() {
  if ( guessField.value !== "" ) {
    guessField.value = "";
    guessButton.disabled = true;
    clear.disabled = true;
  }
});

reset.addEventListener("click", function() {
  document.getElementById("min").value = 1
  document.getElementById("max").value = 100
  document.getElementById("winner").innerHTML = "";
  answer = getRandomNumber(min - 10, max + 10)
  yourLast.innerHTML = "";
  recent.innerHTML = "";
  messageField.innerHTML = "";
  guess.value = "Enter Your Guess";
  reset.disabled = true;
})

document.getElementById("guess-button").addEventListener("click", function() {
  yourLast.innerHTML = "Your last guess was";
  document.getElementById("winner").innerHTML = "";
  min = parseInt(document.getElementById("min").value);
  max = parseInt(document.getElementById("max").value);
  var guess = parseInt(document.getElementById("guess").value)
  if (typeof answer === "undefined" || answer < min || answer > max ) {
    answer = getRandomNumber(min, max)
  }
  var message;
  if (guess < min || guess > max ) {
    message = `That is not a number between ${min} and ${max}. Try again`
  } else if (guess > answer) {
    message = "That is too high"
  } else if (guess < answer) {
    message = "That is too low"
  } else if (guess === answer) {
    message = "BOOM! You got that one.";
    document.getElementById("min").value = min - 10
    document.getElementById("max").value = max + 10
    answer = getRandomNumber(min - 10, max + 10)
    document.getElementById("winner").innerHTML = `Now pick an number between ${min - 10} and ${max + 10}`
  } else {
    yourLast.innerHTML = "Your last guess was not a number";
    guess = ""
    message = "Please Try Again."
  }
  recent.innerHTML = guess;
  messageField.innerHTML = message;
  reset.disabled = false;
})
