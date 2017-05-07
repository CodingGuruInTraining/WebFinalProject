var aLocalStrategy = require('passport-local');
var aUserobj = require('../models/user');

function newUserValidation(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        aUserobj.findById(id, function(err, user) {
            done(err, user);
        })
    });

    passport.use('signupConfig', new aLocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        process.nextTick(function() {
            aUserobj.findOne({ 'localUser.username' : username }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, req.flash('nameTakenMsg', 'This username is already taken'));
                }

                var newUser = new aUserobj();
                newUser.localUser.username = username;
                newUser.localUser.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                })
            })
        })
    }));

    passport.use('loginConfig', new aLocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        process.nextTick(function() {
            aUserobj.findOne({ 'localUser.username' : username }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('nameNotFoundMsg', 'Username or password is incorrect'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('wrongPwMsg', 'Username or password is incorrect'));
                }
                return done(null, user);
            });
        });
    }));
}






module.exports = newUserValidation;