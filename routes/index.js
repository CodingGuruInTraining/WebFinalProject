var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '_____ Stat Tracker' });
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





module.exports = router;
