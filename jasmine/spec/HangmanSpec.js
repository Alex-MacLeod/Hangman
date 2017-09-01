describe('Hangman', function () {
    let wordlist = ["word", "word", "word", "word"];
    
    it("should choose word from wordlist", function() {
      expect(chooseWordFrom(wordlist)).toEqual("WORD");
    }); 
});

describe('Hangman', function () {

    word = "WORD";
        
    let guessedLetter = "K";
    let guessedWord = "BIKE";
        
    it("should guess letter incorrectly", function() {
        checkLetter()
        expect(mistakes).toEqual(1);
    }); 

    it("should guess word incorrectly", function() {
        checkWord()
        expect(mistakes).toEqual(1);
    });  
});

describe('Hangman', function () {
    
    word = "WORD";
    let guessedLetter = "W";
    let guessedWord = "WORD";
        
    it("should guess letter correctly", function() {
        checkLetter()
        expect(mistakes).toEqual(0);
    }); 

    it("should guess word correctly", function() {
        checkWord()
        expect(mistakes).toEqual(0);
    });  
});

describe('Hangman', function () {
    
    it("should lose game", function() {
        lose();
        expect(losses).toEqual(1);
    });

    it("should win game", function() {
        win();
        expect(wins).toEqual(1);
    });
});