"use strict";

let wordsTxt = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";
let request;

let wordList = [];

let word = "";
let letters = [];

let mistakes = 0;

let playAgain = "<button type=\"button\" onclick=\"reset()\">Play again</button>";

let games = 0;
let losses = 0;
let wins = 0;

let debugMode = false;

function requestFrom(data) {
    return new Promise((resolve) => {
        request = new XMLHttpRequest();
        request.open("GET", data, true);
        request.responseType = "text";
        request.send();
        request.onload = function () {
            const requestData = request.responseText;
            wordList = requestData.split("\n");
            resolve(wordList);
        };
    })
}

function chooseWordFrom(list) {
    if (list.length > 0) {
        let random = Math.floor(Math.random() * list.length);
        let randWord = list[random];
        let hangWord = randWord.toUpperCase();
        return hangWord;
    } else {
        alert("Error: no words in list");
    }
}

function start(){
    document.getElementById("startButton").innerHTML = "";
    document.getElementById("loading").innerHTML = "<img src=\"loading.gif\" alt=\"Loading...\" style=\"width:80px;height:50px;\">";
    requestFrom(wordsTxt).then(setupGame);
}
function setupGame() {
    word = chooseWordFrom(wordList);
    word = word.substring(0,word.length-1); //added this line after work since it started adding mysterious
    for (let i = 0; i < word.length; i++) {        //character at end of string when i tested it at home
        letters[i] = "_";
        document.getElementById("letters").innerHTML += letters[i] + " ";
    }
    document.getElementById("loading").innerHTML = "";
}

function draw() {
    switch (true) {
        case (mistakes === 1):
            document.getElementById("drawBase").innerHTML = "-------------";
            break;
        case (mistakes === 2):
            document.getElementById("draw2").innerHTML = "\n" + "|";
            break;
        case (mistakes === 3):
            document.getElementById("draw3").innerHTML = "\n" + "|" + "\n" + "/\\";
            break;
        case (mistakes === 4):
            document.getElementById("draw4").innerHTML = "\n" + "|" + "\n" + "/|\\";
            break;
        case (mistakes === 5):
            document.getElementById("draw5").innerHTML = "\n" + "|" + "\n" + "O";
            break;
        case (mistakes === 6):
            document.getElementById("draw6").innerHTML = "\n" + "|" + "\n" + "|";
            break;
        case (mistakes === 7):
            document.getElementById("drawArm").innerHTML = "_________";
            break;
        default:
            alert("Draw error");
    }
}

function win() {
    wins++;
    document.getElementById("winLoseMessage").innerHTML = "You won! Well played!";
    document.getElementById("playAgain").innerHTML = playAgain;
}

function lose() {
    losses++;
    document.getElementById("winLoseMessage").innerHTML = "You lost! The word was " + word;
    document.getElementById("playAgain").innerHTML = playAgain;
}

function mistake() {
    draw();
    if (mistakes === 7) {
        lose();
    }
}

function checkLetter() {
    if (word.length>0) {
        let gl = document.getElementById("guessLetter");
        let guessedLetter = gl.options[gl.selectedIndex].value.toUpperCase();

        if (word.includes(guessedLetter)) {
            let index = word.indexOf(guessedLetter);
            for (let k = index; k < word.length; k++) {
                if (word.charAt(k) === guessedLetter) {
                    letters[k] = guessedLetter;
                }
            }
            document.getElementById("letters").innerHTML = "";
            for (let j = 0; j < letters.length; j++) {
                document.getElementById("letters").innerHTML += letters[j] + " ";
            }
        } else {
            document.getElementById("mistakeLetters").innerHTML += guessedLetter + " ";
            mistakes++;
            mistake();
        }
    } else {
        alert("Hold on, the game hasn't started yet!");
    }


    let stringLetters = "";
    for (let s = 0; s < letters.length; s++) {
        stringLetters += letters[s];
    }
    if (stringLetters === word) {
        win();
    }
}

function checkWord(w) {
    if (word.length>0) {
        let guessedWord = document.getElementById("guessWord").value;

        if (word === guessedWord) {
            win();
        } else {
            mistakes++;
            mistake();
        }
    } else {
        alert("Hold on, the game hasn't started yet!");
    }
}

function reset() {
    word = "";
    letters = [];
    mistakes = 0;
    document.getElementById("startButton").innerHTML = "<button type=\"button\" onclick=\"start(wordList)\">Start game!</button>";
    document.getElementById("letters").innerHTML = "";
    document.getElementById("mistakeLetters").innerHTML = "";
    document.getElementById("drawBase").innerHTML = " ";
    document.getElementById("draw2").innerHTML = " ";
    document.getElementById("draw3").innerHTML = " ";
    document.getElementById("draw4").innerHTML = " ";
    document.getElementById("draw5").innerHTML = " ";
    document.getElementById("draw6").innerHTML = " ";
    document.getElementById("drawArm").innerHTML = " ";
    document.getElementById("winLoseMessage").innerHTML = "";
    document.getElementById("playAgain").innerHTML = "";
    games++;
}

function debug() {
    if (debugMode) {
        document.getElementById("startButton").innerHTML = "Hangman [DEBUG]"

    }
}