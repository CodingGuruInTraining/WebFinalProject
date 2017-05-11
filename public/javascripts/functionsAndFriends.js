// var errorCount;
var elapsedTime = 0;
var theInterval;

function addMyListeners() {

    $('#playBtn').click(function() {
        console.log('play button pressed')
    });

    $('#loginBtn').click(function () {
        console.log('login button pressed')
    });

    $('#homeBtn').click(function () {
        console.log('home button pressed')
    });

    $('#anotherBtn').click(function () {
        console.log('another button pressed')
    });
// TODO move to server if there is 'time' (pun intended!)
    $('#startBtn').click(function() {
        console.log('start button pressed');
        if (theInterval == null) {
            theInterval = setInterval(function () {
                console.log(elapsedTime);
                elapsedTime++;
                var minutes = Math.floor(elapsedTime / 60);
                var seconds = Math.floor(elapsedTime % 60);
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                $('#timer').text(minutes + ":" + seconds);
            }, 1000)
        }
    });

    $('#doneBtn').click(function () {
        console.log('done button pressed');
        clearInterval(theInterval);
    });

    $('#typedMsg').keyup(function() {

        var setString = $('#msgToType').text();
        console.log('set: ' + setString);

// for testing:
        setString = "this is a string!"

        var typedString = $('#typedMsg').val();
        console.log('typed: ' + typedString);

        if (setString == typedString) {
            console.log('equal strings');
        }

        for (var i = 0; i < typedString.length; i++) {
            if (setString.charAt(i) != typedString.charAt(i)) {
                typedString = typedString.slice(0, -1);
                console.log('nope, new string: ' + typedString);
                $('#typedMsg').val(typedString);
                return;
            }
        }

    });
}

addMyListeners();

// helpers:
// http://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript