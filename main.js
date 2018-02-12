var Word = require("./word.js");
var inquirer = require("inquirer");

var wordBank = ["Infinity", "One Hundred", "Three Hundred and Fifty"];

function startGame() {
    var targetWord = new Word(wordBank[2]);
    targetWord.userProgress();
    console.log(targetWord.letterArr);
}

startGame();