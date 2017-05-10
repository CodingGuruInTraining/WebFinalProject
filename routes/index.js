var express = require('express');
var router = express.Router();
var passport = require('passport');
var quoteGrab = require('../helpers/quoteGrabber');
var quotes;

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.redirect('/table');
    // res.render('index', { title: 'Speed Typing Stat Tracker' });
});



router.get('/table', isLoggedIn, function(req, res, next) {
    res.render('table', {title: "Speed Typing Stat Tracker"});
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


// GET logout
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});


// POST typing page's ACTION
router.post('/typethisAction', function(req, res) {
   // console.log(req.body);
    // console.log(req.query);
});



// GET typing page
// TODO add isLoggedIn once authentication is working.
router.get('/typethis', function(req, res, next) {

console.log("start of route");
    if (!quotes) {
        quoteGrab(function (data, error) {
            console.log("inside function");
            if (error) {
                res.render('error', { error: error.message});
            }
            console.log("console.logs");
            console.log(data[1]);
            console.log(data);
            var randNum = Math.floor((Math.random() * data.count));
            console.log(randNum);
            res.render('typethis', { username: req.user.local.username,
                messageToType: data[randNum] })
        });
    }

    console.log("didn't find anything");
    res.render('typethis')
});

// Makes a function to check authentication before continuing.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
