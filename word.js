var Letter = require("./letter.js");

var Word = function(word) {
    this.word = word;
    this.letterArr = [];
}

Word.prototype.userProgress = function() {
    for(let i=0; i<this.word.length; i++) {
        var newLetter = new Letter(this.word[i]);
        if(this.word[i] == " "){
            newLetter.value = " ";
        }
        this.letterArr.push(newLetter);
    }
};

module.exports = Word;