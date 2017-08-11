module.exports = {

    calcAccuracy : function(typedRound, quote)
    {
console.log('starting calculations');
        var numTypedChars = typedRound.typedText.length;
console.log('typed length count: ' + numTypedChars);
        var errorCount = typedRound.numErrors;
        var timeTaken = typedRound.time / 60;

console.log('quote length: ' + quote.length);
console.log('error count before: ' + errorCount);
        if (quote.length > numTypedChars) {
            var diff = 0;
            diff += (quote.length - numTypedChars);
            errorCount += diff;
        }
console.log('error count after: ' + errorCount);
        var wordsCount = numTypedChars / 5;
        var wpmCalc = (wordsCount - errorCount) / timeTaken;
        var accuracyCalc = ((numTypedChars - errorCount) / quote.length) * 100;

console.log("wpm field before: " + typedRound.wpm);
console.log("acc field before: " + typedRound.accuracy);

    typedRound.wpm = wpmCalc;
    typedRound.accuracy = accuracyCalc;
    typedRound.numErrors = errorCount;

console.log("wpm field after: " + typedRound.wpm);
console.log("acc field after: " + typedRound.accuracy);



    return typedRound;
    },

    getMessage : function(score) {
        var msgs = ["Perfect!", "Nice job!", "Not too shabby!", "Not bad; not good, but not bad.", "I have seen worse.", "Who needs computers anyways?!"];
        var msg;
console.log('score before: ' + score);
        score = parseFloat(score);
console.log('score after: ' + score);

        switch (true) {
            case score == 100:
                msg = msgs[0];
                break;
            case score > 90:
console.log('score is > 90!');
                msg = msgs[1];
                break;
            case score > 80:
console.log('score is > 80!');
                msg = msgs[2];
                break;
            case score > 70:
console.log('score is > 70!');
                msg = msgs[3];
                break;
            case score > 60:
                msg = msgs[4];
                break;
            default:
                msg = msgs[5];
                break;
        }
        return msg;
    }

};






// helpers:
// https://www.speedtypingonline.com/typing-equations
// https://stackoverflow.com/questions/35749288/separate-file-for-routes-in-express
// https://stackoverflow.com/questions/5464362/javascript-using-a-condition-in-switch-case