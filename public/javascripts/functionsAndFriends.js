var elapsedTime = 0;
var theInterval;
var setString;
var youMayStart = false;
var numErrors = 0;

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





    $('#typedMsg').keyup(function () {
        if (youMayStart === true) {
            if (setString == null) {
                setString = $('#msgToType').text();
            }
            var typedString = $('#typedMsg').val();
            if (setString == typedString) {
                console.log('equal strings');
            }
            for (var i = 0; i < typedString.length; i++) {
                if (setString.charAt(i) != typedString.charAt(i)) {
                    if (setString.charAt(i) != "." && typedString.charAt(i) != ".") {
                        typedString = typedString.slice(0, -1);
                        $('#typedMsg').val(typedString);
                        numErrors++;
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

addMyListeners();
fillTable();

// helpers:
// http://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript