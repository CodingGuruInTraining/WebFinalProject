var elapsedTime = 0;
var theInterval;
var setString;
var youMayStart = false;
var numErrors = 0;
var setStringArray = [];
var errorFlag = false;

var scoreTbl, asc1 = 1, asc2 = 1, asc3 = 1;


var formApp = angular.module('myApp', []);

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
        if (youMayStart) {
            clearInterval(theInterval);
            youMayStart = false;
            $('#numErrors').val(numErrors);
            $('#timeTaken').val(elapsedTime);
        }
        else {
            console.log("uh uh uhh; gotta try first!");
            return false;
        }
    });


    $('#typedMsg').bind('copy', function() {
        console.log("trying to copy is wrong!");
        return false;
    });

    $('#typedMsg').bind('paste', function() {
        console.log("trying to paste is wrong!");
        return false;
    });


    $('#typedMsg').keydown(function (e) {
        if (youMayStart === false) {
            return false;
        }

        if (e.ctrlKey) { return false; }

        if (setString == null) {
            setString = $('#msgToType').text();
            for (var i = 0; i < setString.length; i++) {
                setStringArray[i] = setString.charCodeAt(i);
            }
            formApp.controller('myCtrl', function($scope) {
                $scope.typedModel = setString;
            });
        }

        var typedString = $('#typedMsg').val();

        if (setString === typedString) {
// TODO make box around stuff green border.
            console.log('equal strings');
        }

        for (i = 0; i < typedString.length; i++) {
            // Compares each character.
            if (setString.charAt(i) != typedString.charAt(i)) {
                // Checks for periods, which don't seem to work in above check.
                if (setString.charAt(i) != "." && typedString.charAt(i) != ".") {
                    typedString = typedString.slice(0, -1);
                    $('#typedMsg').val(typedString);
                    errorFlag = true;
                    return;
                }
            }
        }
    });




    $('#typedMsg').keyup(function() {
        if (errorFlag) {
            numErrors++;
            errorFlag = false;
        }
    })
}



function sortScoreTbl(tbody, col, asc) {

console.log('sort function start');

    var myRows = tbody.rows;
    var numRows = myRows.length;
    var rowsArray = new Array();
    var rowCells, numCells;

    for (var i = 0; i < numRows; i++) {
        rowCells = myRows[i].cells;
        numCells = rowCells.length;
        rowsArray[i] = new Array();
        for (var j = 0; j < numCells; j++) {
            rowsArray[i][j] = rowCells[j].innerHTML;
        }
    }

    rowsArray.sort(function(a, b) {
        return (a[col] == b[col] ? 0 : ((a[col] > b[col]) ? asc : -1 * asc))
    });

    for (i = 0; i < numRows; i++) {
        myRows[i].innerHTML = "<td>" + rowsArray[i].join("</td><td>") + ("</td>");
    }

console.log('sort function end');

}



addMyListeners();
scoreTbl = $('#tblRows');

// helpers:
// http://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript
// http://stackoverflow.com/questions/4604057/jquery-keypress-ctrlc-or-some-combo-like-that
// http://stackoverflow.com/questions/1772179/get-character-value-from-keycode-in-javascript-then-trim
// http://stackoverflow.com/questions/3977792/how-to-convert-keycode-to-character-using-javascript
// http://stackoverflow.com/questions/25872902/how-can-i-detect-ctrl-v-in-javascript-for-ie-and-firefox
// https://forums.asp.net/t/1662177.aspx?Capture+a+Client+Side+KeyPress+with+Javascript+and+Run+a+Server+Side+Event+with+ASP+NET+VB+NET
// http://www.mkyong.com/jquery/how-to-detect-copy-paste-and-cut-behavior-with-jquery/
// https://www.w3schools.com/angular/angular_validation.asp
// http://jsfiddle.net/kgondra/qGf45/