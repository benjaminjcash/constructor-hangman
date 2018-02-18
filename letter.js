//constructer for the "Letter" object.
var Letter = function(letter) {
    //holds the character specific to each instance of the object.
    this.letter = letter;
    //holds the current "value" of the object, which is displayed in the console.
    this.value = "_";
};

module.exports = Letter;