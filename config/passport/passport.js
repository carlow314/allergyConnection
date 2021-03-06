var bCrypt = require('bcryptjs');
module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user.id);

    });
    // deserialize user 
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    req.flash("error", "Signup error: This email is already taken!");
                    return done(null, false);
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        email: email,
                        password: userPassword,
                        Firstname: req.body.Firstname,
                        Lastname: req.body.Lastname
                    };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
    passport.use('local-signin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (!user) {
                    req.flash("error", "Sign-in error: Please enter a valid email!");
                    return done(null, false, {
            
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    req.flash("error", "Sign in error: Please enter a valid password!");
                    return done(null, false, {
                    });
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                req.flash("error",'Sign in error: Something went wrong with your Signin!')
                return done(null, false, {
                });
            });
        }
    ));
}