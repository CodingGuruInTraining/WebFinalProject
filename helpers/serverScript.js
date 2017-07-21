module.exports = {

    calcAccuracy : function(typedRound, quote)
    {
        var numTypedChars = typedRound.typedText.length;
        var errorCount = typedRound.numErrors;
        var timeTaken = typedRound.time / 60;

// TODO move string compare (for errors) here.
        if (quote.length > numTypedChars) {
            var diff = 0;
            diff += (quote.length - numTypedChars);
            errorCount += diff;
// TODO update error property.
        }

        var wordsCount = numTypedChars / 5;
        var wpmCalc = (wordsCount - errorCount) / timeTaken;
        var accuracyCalc = (numTypedChars / quote.length) * 100;

console.log("wpm field before: " + typedRound.wpm);
console.log("acc field before: " + typedRound.accuracy);
//TODO set a default in schema if ^^^^ errors out.
    typedRound.wpm = wpmCalc;
    typedRound.accuracy = accuracyCalc;
console.log("wpm field after: " + typedRound.wpm);
console.log("acc field after: " + typedRound.accuracy);
// TODO save/update Round?

    // Not sure if returning is needed; should test results without first.
    return typedRound;
    },

    getMessage : function(score) {
        var msgs = ["Perfect!", "Nice job!", "Not too shabby!", "Not bad; not good, but not bad.", "I have seen worse.", "Who needs computers anyways?!"];
        var msg;
        switch (score) {
            case 100:
                msg = msgs[0];
                break;
            case score > 90:
                msg = msgs[1];
                break;
            case score > 80:
                msg = msgs[2];
                break;
            case score > 70:
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