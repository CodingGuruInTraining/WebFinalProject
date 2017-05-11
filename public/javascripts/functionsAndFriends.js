// var errorCount;
var elapsedTime = 0;
var theInterval;
var setString;
var youMayStart = false;
var numErrors = 0;

function addMyListeners() {

    $('#playBtn').click(function () {
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
    $('#startBtn').click(function () {
        console.log('start button pressed');
        // Checks if interval has been set already to avoid activating
        // multiple instances (speeds up clock).
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
            }, 1000);
            youMayStart = true;
        }
    });

    $('#doneBtn').click(function () {
        console.log('done button pressed');
        clearInterval(theInterval);
        youMayStart = false;
        $('#numErrors').val(numErrors);
        $('#timeTaken').val(elapsedTime);
        console.log($('#numErrors').value);
    });

    $('#typedMsg').keyup(function () {
console.log($('#numErrors').value);
        if (youMayStart === true) {
            if (setString == null) {
                setString = $('#msgToType').text();
                console.log('set: ' + setString);
            }
// for testing:
//         setString = "this is a string!"

            var typedString = $('#typedMsg').val();
            console.log('typed: ' + typedString);

            if (setString == typedString) {
                console.log('equal strings');
            }

            for (var i = 0; i < typedString.length; i++) {
                if (setString.charAt(i) != typedString.charAt(i)) {
                    if (setString.charAt(i) != "." && typedString.charAt(i) != ".") {
                        typedString = typedString.slice(0, -1);
                        console.log('nope, new string: ' + typedString);
                        $('#typedMsg').val(typedString);
                        numErrors++;
                        console.log("num is now " + numErrors);
                        return;
                    }
                }
            }
        }
    });
}


/**
 *
 * TABLE FILL METHODS
 *
 * */
// function fillTable() {
//     $.ajax({
//         method:"GET",
//         url:"fillAll"
//     }).done(function(data) {
//         addEachRow(data);
//     }).fail(function(error) {
//         console.log("error occurred:");
//         console.log(error);
//     })
// }
//
// function addEachRow(data) {
//     var table = $('#dataTable');
//     for (var i = 0; i < data.length; i++) {
//         addRow(data[i], table);
//     }
// }
//
// function addRow(data, table) {
// // TODO figure out what is being passed and fill in row
// // TODO may need to modify what is sent over somehow
// console.log('addRow about to crash');
//     var row = '<tr>' +
//         '<td>' + data.username + '</td>' +
//         '<td>' + data.time + '</td>' +
//         '<td>' + data.something1 + '</td>' +
//         '<td>' + data.something2 + '</td>' +
//         '<td>' + data.something3 + '</td>' +
//         '</tr>';
//     table.append(row);
// }
/*****************/

addMyListeners();
// fillTable();

// helpers:
// http://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript