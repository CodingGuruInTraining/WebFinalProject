var express = require('express');
var router = express.Router();
var passport = require('passport');
// Gets a random quote from API.
var quoteGrab = require('../helpers/quoteGrabber');
// Variable to hold the random quote string.
var quote;
var allQuotes;



/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.redirect('/table');
});

router.get('/table', isLoggedIn, function(req, res, next) {
    res.render('table', {title: "Speed Typing Stat Tracker"});
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
            allQuotes = data;
        })
    }

            // Gets the length of the quote collection and
            // draws a random one.
            var datacount = Object.keys(data).length;
            var randNum = Math.floor((Math.random() * (datacount-1)));
            quote = allQuotes[randNum];
            // Renders page.
            res.render('typethis', { msgToType: quote });
        });
    // }
// });






// GET results page
router.get('/results', function(req, res, next) {
    res.render('results')
});

// POST results page
router.post('/results', function(req, res) {
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

            console.log("errors before: " + numOfErrors);
            numOfErrors += (quote.length - inputText.length);
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

    var perc = (1 - (numOfErrors / quote.length)) * 100;

    res.render('results', {greet: "Nice job, pal!", errors: numOfErrors, percent: perc,
        timetaken: totalTime});

// TODO query db for all records of user
});






// Should GET all database items and send them somewhere, hopefully the table.
router.get('/fillAll', function(req, res, next) {
    req.db.collection('records').find().toArray(function(err, docs) {
        if (err) {
            return next(err)
        }
        res.json(docs);
    });
});





router.post('/typingSubmit', function(req, res) {
// TODO do some validation with input
    var user = req.body.username;

    req.db.collection('records').insertOne({something: 'something'});
    res.redirect('/table');
});







// Makes a function to check authentication before continuing.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;




// helpers:
//     http://stackoverflow.com/questions/13782698/get-total-number-of-items-on-json-object