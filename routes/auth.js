var passport = require("passport");
var request = require("request");

var authController = require('../controller/authcontroller.js');
module.exports = function (app) {
    app.get('/', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/dashboard', isLoggedIn, authController.dashboard);
    app.get('/logout', authController.logout);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }));

    //dog facts API
    request("http://dog-api.kinduff.com/api/facts?number=100", (err, res, body) => {
        var dogfacts = [];
        if (!err && res.statusCode === 200) {
            // console.log("Here are five random dog facts: " + JSON.parse(body));
            var facts = JSON.parse(body);
            dogfacts.push(facts);
        }
        console.log(dogfacts);
    });

    //random dog image
    request("https://dog.ceo/api/breeds/image/random", (err, res, body) => {
        if (!err && res.statusCode === 200) {
            console.log("Cute ass dog!: " + (body));
        }
    });

    const RandomPuppy = require('random-puppy');
    RandomPuppy()
        .then(url => {
            console.log(url);
        })
}