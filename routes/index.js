var express = require('express');
var router = express.Router();
var passport = require('passport');
// Gets a random quote from API.
var quoteGrab = require('../helpers/quoteGrabber');
// Variable to hold the random quote string.
var quote;
var currentUser;
var Round = require('../models/typingRound');


var myFunctions = require('../helpers/serverScript');


// var Handlebars = require("handlebars");
// var NumeralHelper = require("handlebars.numeral");
// NumeralHelper.registerHelpers(Handlebars);


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.redirect('/table');
});

router.get('/table', isLoggedIn, function(req, res, next) {
    Round.find({}, function(err, docs) {
        if(err) {
            return next(err);
        }

        docs.sort(function(a,b) {
            return b.wpm - a.wpm;
        });

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
    // Grabs a quote collection from API.
    quoteGrab(function (data, error) {
        if (error) {
            res.render('error', {error: error.message});
        }
        quote = data[0].trim();
        // Renders page.
        res.render('typethis', { msgToType: quote });
    });
});






// GET results page
// router.get('/results', function(req, res, next) {
//     res.render('results')
// });

// POST results page
router.post('/results', function(req, res, next) {
    // Captures passed values into variables.
console.log(req.body);
    var inputText = req.body.typedText;
    var numOfErrors = req.body.numErrors;
    var totalTime = req.body.timeTaken;
console.log('inputText: ' + inputText);
    // Creates a JSON object of fields and values for new Round object.
    var newEntry = {user: currentUser.local.username,
                    time: totalTime,
                    numErrors: numOfErrors,
                    typedText: inputText,
                    userid: currentUser._id};
    // Creates new Round object.
    var newRound = new Round(newEntry);

    newRound = myFunctions.calcAccuracy(newRound, quote);
    var msg = myFunctions.getMessage(newRound.accuracy);

    // Saves object to database.
    newRound.save(function(err) {
        if(err) {
            console.log('your error sir: ' + err.message);
            throw err;
        }
        // Renders page.
        res.render('results', {greet: msg, mydata: newRound});
    });
});




// GET Another button's action.
router.get('/anotherGo', function(req, res) {
    res.redirect('/typethis');
});




// Function to check authentication before continuing.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        currentUser = req.user;
        return next();
    }
    res.redirect('/login');
}



module.exports = router;




// helpers:
// http://stackoverflow.com/questions/13782698/get-total-number-of-items-on-json-object
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// https://stackoverflow.com/questions/17934207/handlebars-js-custom-function-sort
// https://www.npmjs.com/package/handlebars.numeral