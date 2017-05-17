var elapsedTime = 0;
var theInterval;
var setString;
var youMayStart = false;
var numErrors = 0;
var setStringArray = [];

function addMyListeners() {
// TODO move to server if there is 'time' (pun intended!)
    $('#startBtn').click(function () {
        // Checks if interval has been set already to avoid activating
        // multiple instances (speeds up clock).
        if (theInterval == null) {
            theInterval = setInterval(function () {
                elapsedTime++;
                var minutes = Math.floor(elapsedTime / 60);
                var seconds = Math.floor(elapsedTime % 60);
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                $('#timer').text(minutes + ":" + seconds);
            }, 1000);
            youMayStart = true;
        }
    });






    $('#doneBtn').click(function () {
        clearInterval(theInterval);
        youMayStart = false;
        $('#numErrors').val(numErrors);
        $('#timeTaken').val(elapsedTime);
    });





    $('#typedMsg').keydown(function (e) {
        if (youMayStart === false) {
            return false;
        }

        console.log("keyCode is: " + e.keyCode + " which is: " + String.fromCharCode(e.keyCode));
        console.log("e is: " + e);

        if (e.ctrlKey && e.keyCode == 86) {
            return false;
        }
console.log('checkpoint');
            if (setString == null) {
                setString = $('#msgToType').text();
console.log('checkpoint2');
                for (var i = 0; i < setString.length; i++) {
                    setStringArray[i] = setString.charCodeAt(i);
                }
            }
            var typedString = $('#typedMsg').val();
            if (setString === typedString) {
// TODO make box around stuff green border.
                console.log('equal strings');
            }
// Surprisingly, this is the only part that works:
            if (e.keyCode == 13) {
                enterKeyHit(typedString);
                return;
            }

            var nextIndex = typedString.length;
// TODO test what happens if typing after completed string.
        if (nextIndex > setStringArray) {
            return false;
        }

        if (e.keyCode == setStringArray[nextIndex]) {
            typedString += String.fromCharCode(e.keyCode);
            // $('#typedMsg').val(typedString);
        }
        else {
            console.log("wrong key");
            numErrors++;
            return false;
        }

            // for (var i = 0; i < typedString.length; i++) {
            //     // Compares each character.
            //     if (setString.charAt(i) != typedString.charAt(i)) {
            //         // Checks for periods, which don't seem to work in above check.
            //         if (setString.charAt(i) != "." && typedString.charAt(i) != ".") {
            //             typedString = typedString.slice(0, -1);
            //             $('#typedMsg').val(typedString);
            //             numErrors++;
            //             return;
            //         }
            //     }
            // }
        // }
    });




    // $(document).on('keydown', function(e) {
    //     if ((e.metaKey || e.ctrlKey) && ((String.fromCharCode(e.which).toLowerCase() === 'c'))) {
    //
    //         console.log('uh uh uh!');
    //         $('#typedMsg').val("");
    //         // $('#typedMsg').text("");
    //     }
    //     else if ((e.metaKey || e.ctrlKey) && (String.fromCharCode(e.which).toLowerCase() === 'v')) {
    //         console.log('cant do that');
    //         $('#typedMsg').val("");
    //     }
    // })
}


/**
 *
 * TABLE FILL METHODS
 *
 * */
function fillTable() {
    $.ajax({
        method:"GET",
        url:"fillAll"
    }).done(function(data) {
        addEachRow(data);
    }).fail(function(error) {
        console.log("error occurred:");
        console.log(error);
    })
}

function addEachRow(data) {
// console.log(data);                       // data is coming as all elements on the page
// console.log("data length: " + data.length);
// console.log(Object.keys(data).length);
    var table = $('#dataTable');
    for (var i = 0; i < data.length; i++) {
        addRow(data[i], table);
    }
}

function addRow(data, table) {
// TODO figure out what is being passed and fill in row
// TODO may need to modify what is sent over somehow
console.log('addRow about to crash');
    var row = '<tr>' +
        '<td>' + data.username + '</td>' +
        '<td>' + data.time + '</td>' +
        '<td>' + data.something1 + '</td>' +
        '<td>' + data.something2 + '</td>' +
        '<td>' + data.something3 + '</td>' +
        '</tr>';
    table.append(row);
}
/*****************/





function enterKeyHit(input) {
    $.ajax({
        method: "POST",
        url: "results",
        data: { typedMsg: input, numErrors: numErrors, timeTaken: elapsedTime }
    }).done(function() {
        console.log("Enter key function passed!");
    }).fail(function() {
        console.log("Enter key function failed");
    })
}




addMyListeners();
// fillTable();

// helpers:
// http://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript
// http://stackoverflow.com/questions/4604057/jquery-keypress-ctrlc-or-some-combo-like-that
// http://stackoverflow.com/questions/1772179/get-character-value-from-keycode-in-javascript-then-trim
// http://stackoverflow.com/questions/3977792/how-to-convert-keycode-to-character-using-javascript
// http://stackoverflow.com/questions/25872902/how-can-i-detect-ctrl-v-in-javascript-for-ie-and-firefox
