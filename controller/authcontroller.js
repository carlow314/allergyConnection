var exports = module.exports = {}
exports.signup = function (req, res) {
    var error = req.flash("error");
    console.log(error);
    res.render('signup', {error: error});
};

exports.signin = function (req, res) {
    res.render('signin');

}

exports.dashboard = function (req, res) {
    res.render('dashboard');
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}