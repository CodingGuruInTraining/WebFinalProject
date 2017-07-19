function calcAccuracy(typedRound, quote) {
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
    // return typedRound;
}

module.exports = calcAccuracy;






// helpers:
// https://www.speedtypingonline.com/typing-equations