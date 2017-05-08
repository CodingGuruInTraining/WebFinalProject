var tempStrings = ["This isn't the string you are looking for.", "something, something, something, dark side."];

function getQuote() {
    var quote = tempStrings[Math.floor(Math.random() * tempStrings.length)];
    return quote;
}

