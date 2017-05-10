var express = require('express');
var router = express.Router();
var passport = require('passport');
var quoteGrab = require('../helpers/quoteGrabber');
var quotes;

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Speed Typing Stat Tracker' });
});





// GET login page
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'title here' });
});
// POST login action
router.post('/login', passport.authenticate('loginConfig', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));



// GET signup page
router.get('/signup', function(req, res, next) {
    res.render('signup')
});
// POST signup action
router.post('/signup', passport.authenticate('signupConfig', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));


// GET results page
router.get('/results', function(req, res, next) {
    res.render('results')
});



// GET typing page
router.get('/typethis', function(req, res, next) {

// console.log("start of route");
//     if (!quotes) {
        quoteGrab(function (data, error) {
            console.log("inside function");
            if (error) {
                return res.render('error', { error: error.message});
            }
            console.log("console.logs");
            console.log(data[1]);
            console.log(data);
            var randNum = Math.floor((Math.random() * data.count));
            console.log(randNum);
            return res.render('typethis', {messageToType: data[randNum]})
        });
    // }


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
