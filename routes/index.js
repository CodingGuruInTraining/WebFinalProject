var express = require('express');
var router = express.Router();
var passport = require('passport');
// Gets a random quote from API.
var quoteGrab = require('../helpers/quoteGrabber');
// Variable to hold the random quote string.
var quote;
var allQuotes;
var User = require('../models/user');
var currentUser;
var Round = require('../models/typingRound');




/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.redirect('/table');
});

router.get('/table', isLoggedIn, function(req, res, next) {
    Round.find({}, function(err, docs) {
        if(err) {
            return next(err);
        }
// TODO refactor name later
        res.render('table', {title: "Speed Typing Stat Tracker", users: docs});
    });
});





// GET login page
router.get('/login', function(req, res, next) {
    res.render('login');
});

// POST login action
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/table',
    failureRedirect: '/login',
    failureFlash: true
}));





// GET logout action
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});





// GET signup page
router.get('/signup', function(req, res, next) {
    res.render('signup')
});
// POST signup action
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/table',
    failureRedirect: '/signup',
    failureFlash: true
}));





// GET typing page
router.get('/typethis', isLoggedIn, function(req, res, next) {


    // Checks if quote has been set yet.
    if (!allQuotes) {
        // Grabs a quote collection from API.
        quoteGrab(function (data, error) {
            if (error) {
                res.render('error', {error: error.message});
            }
            // console.log(data);
            allQuotes = data;
            // for (var i = 0; i < Object.keys(data).length; i++) {
            //     allQuotes.add(data[i]);
            // }
            // console.log(allQuotes);
        // })
    // }
// console.log(allQuotes);
//             Gets the length of the quote collection and
            // draws a random one.
            var datacount = Object.keys(allQuotes).length;
            var randNum = Math.floor((Math.random() * (datacount-1)));
            quote = allQuotes[randNum];

    // getQuote(data);
            // Renders page.
            res.render('typethis', { msgToType: quote });
        });
    }
});

// function getQuote(data) {
//     var datacount = Object.keys(data).length;
//     var randNum = Math.floor((Math.random() * (datacount-1)));
//     quote = data[randNum];
// }




// GET results page
// router.get('/results', function(req, res, next) {
//     res.render('results')
// });

// POST results page
router.post('/results', function(req, res, next) {
    // Captures passed values into variables.
    var inputText = req.body.typedMsg;
    var numOfErrors = req.body.numErrors;
    var totalTime = req.body.timeTaken;
// TODO may need to remove \ from strings

    console.log("quote length: " + quote.length);
    console.log("input length: " + inputText.length);

    if (quote != inputText) {
        if (quote.length > inputText.length) {
            // Client-side validation would have taken care of what is
            // provided in inputText (no further validation needed);

            var diff = quote.length - inputText.length;


            console.log("errors before: " + numOfErrors);
            numOfErrors += diff; // (quote.length - inputText.length);
            console.log("errors after: " + numOfErrors);
            //
            // for (var i = 0; i < quote.length; i++) {
            //     if (quote.charAt(i) != inputText.charAt(i)) {
            //         numOfErrors++;
            //         break;
            //     }
            // }
        }
    }

    var perc = Math.floor((1 - (numOfErrors / quote.length)) * 100);

    var newEntry = {user: currentUser.local.username,
                    time: totalTime,
                    numErrors: numOfErrors,
                    accuracy: perc,
                    userid: currentUser._id};

    var newRound = new Round(newEntry);

    newRound.save(function(err) {
        if(err) {
            return next(err);
        }

console.log('testing date: ' + newRound.dateTyped);

        console.log("end of results");
        // return done(null, newRound);
        res.render('results', {greet: "Nice job, pal!", mydata: newRound
            // allerrors: numOfErrors, percent: perc,
            // timetaken: totalTime
        });
    });
});





router.get('/anotherGo', function(req, res) {
    res.redirect('/typethis');
});




// Makes a function to check authentication before continuing.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        currentUser = req.user;
        return next();
    }
    res.redirect('/login');
}



module.exports = router;




// helpers:
//     http://stackoverflow.com/questions/13782698/get-total-number-of-items-on-json-object
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
