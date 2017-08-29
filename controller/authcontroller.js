var request = require("request");
var exports = module.exports = {}

exports.signup = function (req, res) {
    var error = req.flash("error");
    console.log(error);

    res.render('signup', {
        error: error,
        title: "furbabies!",
    });
};



exports.signin = function (req, res) {
    var emailError = req.flash("error");
    var passwordError = req.flash("error");
    console.log(passwordError);
    console.log(emailError);
    res.render('signup', {
        error: error
    });

};

exports.selection = function (req, res) {
    res.render('selection', {
        Firstname: req.user.Firstname,
        Lastname: req.user.Lastname,
        email: req.user.email,
        password: req.user.password
    });
};

exports.dogdashboard = function (req, res) {
    request("http://dog-api.kinduff.com/api/facts?number=5", (err, dogRequest, body) => {
        var dogfacts;
        if (!err && dogRequest.statusCode === 200) {
            var facts = JSON.parse(body).facts;
            dogfacts = facts;
        }
        request("https://dog.ceo/api/breeds/image/random", (err, dogPictureRequest, body) => {
            if (!err && res.statusCode === 200) {
                var image = JSON.parse(body);
                var currentimage = image.message;
                console.log(currentimage);

            }
            const RandomPuppy = require('random-puppy');
            RandomPuppy()
                .then(url => {
                    res.render('dogdashboard', {
                        puppyUrl: url,
                        dogFacts: dogfacts,
                        dogImage: currentimage
                    });
                })
        });
    });
};

exports.catdashboard = function (req, res) {
    request("https://catfact.ninja/fact", function (error, catRequest, body) {
        if (!error && res.statusCode === 200) {
            var CatFact = JSON.parse(body).fact;

        }
        res.render('catdashboard', {
            catFact: CatFact
        })
    });
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}