var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Speed Typing Stat Tracker' });
});





// GET login page
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'title here' });
});
// POST login action
router.post('/loginAction', passport.authenticate('loginConfig', {
    goodlogin: '/',
    badlogin: '/login',
    failureFlash: true
}));



// GET signup page
router.get('/signup', function(req, res, next) {
    res.render('signup')
});
// POST signup action
router.post('/signupAction', passport.authenticate('signupConfig', {
    goodsignup: '/',
    badsignup: '/signup',
    failureFlash: true
}));


// GET results page
router.get('/results', function(req, res, next) {
    res.render('results')
});



// GET typing page
router.get('/typethis', function(req, res, next) {
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
