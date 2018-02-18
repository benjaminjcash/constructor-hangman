var Word = require("./word.js");
var inquirer = require("inquirer");
var colors = require("colors");
var progress = "";
var fs = require("fs");
var remainingGuesses = 0;
var wrongGuessArr = [];

//initiates program.
function startGame() {
    //imports data from states.txt.
    fs.readFile("states.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } 
        wordBank = data.split(", ");
        //starts new game.
        newGame();
    });
}

//starts a new game of hangman.
function newGame() {
    //chooses the target word, and creates a word object using the constructor "Word". Resets remainingGuesses to 5. Clears wrongGuessArr.
    wrongGuessArr = [];
    remainingGuesses = 5;
    var randNum = Math.floor(Math.random() * 50);    
    var targetWord = new Word(wordBank[randNum]);
    //uses the createArr method to create an array of Letter objects.
    targetWord.createArr();
    var letterArray = targetWord.letterArr;
    displayProgress(letterArray);
    //runs startGuessing() recursively until a win or lose.
    startGuessing(letterArray);
}

//promts the user to guess a letter.
function startGuessing(arr) {
    inquirer.prompt([
        {
            type: "input",
            name: "letterguess",
            message: "Guess a letter:"
        }
    ]).then(function(answer) {
        var letterGuessed = answer.letterguess
        //validates input, then runs displayProgress.
        if (letterGuessed.match(/^[A-Za-z]+$/) && letterGuessed.length == 1) {
            letterGuessed = letterGuessed.toLowerCase();
            displayProgress(arr, letterGuessed);
        } else {
            console.log("\n" +"invalid input".red+"\n");
            startGuessing(arr);
        } 
    })
}

//compares the user's input with the array of letter objects, checks if the input matches any letters in the target word.
function displayProgress(arr, letter) {
    //displays the target word for the first time, before a letter has been guessed.
    if (!letter) {
        for (let i = 0; i < arr.length; i++) {
            progress += " " + arr[i].value + " ";
        }
        console.log("\n"+progress+"\n");
        progress = "";
    } else {
        var containsLetter = false;
        var alreadyGuessed = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].letter.toLowerCase() === letter && arr[i].value.toLowerCase() != letter) {
                arr[i].value = arr[i].letter; 
                containsLetter = true;
            //checks if the user has already guessed the letter.
            } else if (arr[i].value.toLowerCase() === letter) {
                console.log("\nYou already guessed that letter..\n".red);
                alreadyGuessed = true;
                break
            }
        }
        if (containsLetter) {
            for (let i = 0; i < arr.length; i++) {
                progress += " " + arr[i].value + " ";
            }
            console.log("\nThat's correct!".green);
            console.log("\n"+progress+"\n");
            progress = "";
            var placeholders = 0;
            for (let i = 0; i < arr.length; i++) {
                if(arr[i].value == "_") {
                    placeholders++
                }
            }
            //checks if all the letters have been guessed. If so, displays a win message.
            if (placeholders > 0) {
                startGuessing(arr);
            } else {
                console.log("\nYou win!\n".rainbow);
                console.log("\nHere is the next word:".yellow);
                newGame();
            }
        } else {
            //checks if the letter was already guessed. If not, decreases remainingGuesses and logs incorrect guess message, adds letter to 
            //wrongGuessArr. If the letter has been guessed, displays cooresponding message, does not decrease guessesRemaining.
            if (!alreadyGuessed) {
                if(wrongGuessArr.indexOf(letter) === -1){
                    console.log("\nThe target word does not contain that letter..".red);
                    remainingGuesses--
                    wrongGuessArr.push(letter);
                    console.log(".....................");
                    console.log("Guesses Remaining: " + remainingGuesses);
                    console.log(".....................\n"); 
                } else {
                    console.log("\nYou already guessed that letter..\n".red);
                }             
            }
            //checks if the user has any guesses left. If not, prompts a loss and starts a new game.
            if(remainingGuesses === 0) {
                console.log("\nYou Lose...\n".bgCyan)
                console.log("\nTry again!\n".bgCyan)
                inquirer.prompt([
                    {
                        type: "confirm",
                        message: "Play Again?",
                        name: "playagain"
                    }
                ]).then(function(res) {
                    if (res.playagain) {
                        newGame();
                    };
                })                
            } else {
                startGuessing(arr);
            }
        }
    }
};

startGame();