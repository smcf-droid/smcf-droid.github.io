//alert("running external JS code!")

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

let myLuckyNumber = 7;

//Global variables
let randomNumber;
let attempts = 0;
let totalWins = 0;
let totalLosses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   document.querySelector("#attemptsLeft").textContent = 7;

   document.querySelector("#resetBtn").style.display = "none";

   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus();
   playerGuess.value = "";

   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";

   document.querySelector("#guesses").textContent = "";

}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        let feedback = document.querySelector("#feedback");
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;

    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        totalWins++;
        document.querySelector("#wins").textContent = totalWins;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#attemptsLeft").textContent = 7 - attempts;
        if (attempts ==7) {
            feedback.textContent = "You lost! The number was " + randomNumber + "!";
            feedback.style.color = "red";
            totalLosses++;
            document.querySelector("#losses").textContent = totalLosses;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Your guess was high";
        } else {
            feedback.textContent = "Your guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; // Hides it
    resetBtn.style.display = "inline"; // Shows it
}
//document.querySelector("h1").style.color = "red";