var request = require("request");
const fire = require('../firebase/index');
console.log(' WHAT IS THE CLICK COUNTER', fire);
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
  fire.getClickCountForAnimal().then(response => {
    let dogCount = response.dogClickCount;
    let catCount = response.catClickCount;
    res.render('selection', {
      Firstname: 'req.user.Firstname',
      Lastname: 'req.user.Lastname',
      email: 'req.user.email',
      password: 'req.user.password',
      dogCount: dogCount,
      catCount: catCount,
    });
  })
};

exports.dogdashboard = function (req, res) {
    let animalCount;

      fire.incrementClickCount('dog').then(response => {
        animalCount = response;
      })

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
                        dogImage: currentimage,
                        dogCount: animalCount
                    });
                })
        });
    });
};

exports.catdashboard = function (req, res) {
  let animalCount;
  fire.incrementClickCount('cat').then(response => {
    animalCount = response;
  })
    request("https://catfact.ninja/fact", function (error, catRequest, body) {
        if (!error && res.statusCode === 200) {
            var CatFact = JSON.parse(body).fact;

        }
        res.render('catdashboard', {
            catFact: CatFact,
            catCount: animalCount,
        })
    });
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}
