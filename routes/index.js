var express = require('express');
var router = express.Router();
var passport = require('passport');
var quoteGrab = require('../helpers/quoteGrabber');
// var quotes;
var quote;


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.redirect('/table');
    // res.render('index', { title: 'Speed Typing Stat Tracker' });
});



router.get('/table', isLoggedIn, function(req, res, next) {
    res.render('table', {title: "Speed Typing Stat Tracker"});
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


// GET login page
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'title here' });
});
// POST login action
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/table',
    failureRedirect: '/login',
    failureFlash: true
}));



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


// GET results page
router.get('/results', function(req, res, next) {
    res.render('results')
});


// GET logout action
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});


// POST typing page's ACTION
router.post('/typethisaction', function(req, res) {
    console.log(req.body);
    // console.log(req.query);
    var inputText = req.body.typedMsg;
    var numOfErrors = req.body.numErrors;
    var totalTime = req.body.timeTaken;
    console.log(inputText);
// TODO may need to remove \ from strings


    if (quote != inputText) {
        if (quote.length > inputText.length) {
            for (var i = 0; i < quote.length; i++) {
                if (quote.charAt(i) != inputText.charAt(i)) {
                    numOfErrors++;
                    break;
                }
            }
        }
    }

    var perc = (1 - (quote.length / numOfErrors)) * 100;

        res.render('results', {greet: "Nice job, pal!", errors: numOfErrors, percent: perc,
                                timetaken: totalTime});



// TODO make typingRound object (maybe just replace with user object)
// TODO query db for all records of user
// TODO show results page

});



// router.post('/somethin')

router.get('/playAction', function(req, res) {
    res.redirect('/typethis');
});

router.post('/typingSubmit', function(req, res) {
// TODO do some validation with input
    var user = req.body.username;

    req.db.collection('records').insertOne({something: 'something'});
    res.redirect('/table');
});



// GET typing page
// TODO add isLoggedIn once authentication is working.
router.get('/typethis', function(req, res, next) {

console.log("start of route");
    if (!quote) {
        quoteGrab(function (data, error) {
            console.log("inside function");
            if (error) {
                res.render('error', { error: error.message});
            }
            // console.log("console.logs");
            // console.log(data[1]);
            // console.log(data);
            // console.log(data.count + " count");
            console.log(Object.keys(data).length);
            var datacount = Object.keys(data).length;
            var randNum = Math.floor((Math.random() * (datacount-1)));
            console.log(randNum);
            quote = data[randNum];
            res.render('typethis', { // username: req.user.local.username,
                msgToType: data[randNum] });
            // res.render('typethis');
        });
    }

    console.log("didn't find anything");
    // res.render('typethis')
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