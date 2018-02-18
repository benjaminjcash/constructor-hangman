var Letter = require("./letter.js");

//constructor for the "Word" object.
var Word = function(word) {
    //holds the string specific to each instance of the object.
    this.word = word;
    this.letterArr = [];
}

//creates an instance of "Letter" for each character in "Word", and pushes them into letterArr.
Word.prototype.createArr = function() {
    for(let i=0; i<this.word.length; i++) {
        var newLetter = new Letter(this.word[i]);
        if(this.word[i] == " "){
            newLetter.value = " ";
        }
        this.letterArr.push(newLetter);
    }
};

module.exports = Word;