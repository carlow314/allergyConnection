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
    res.render('selection');
}

exports.dogdashboard = function (req, res) {
    res.render('dogdashboard');
}

exports.catdashboard = function (req, res) {
    res.render('catdashboard');
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}