//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var path = require("path");
var env = require("dotenv").load();
var flash = require('connect-flash');
cookieParser = require('cookie-parser');
// Sets up the Express App;
var PORT = process.env.PORT || 8000;
var app = express()
var passport = require('passport');
var session = require('express-session');

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));
// For Passport
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash())
app.use(function (req, res, next) {
  // res.locals.error = req.flash('error')
  next()
});
// Static directory
app.use(express.static("public/"));
// Set Handlebars
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  partialsDir: __dirname + '/views/partials/'
}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// Routes
var authRoute = require("./routes/auth.js")(app);
//Passport strategies
require('./config/passport/passport.js')(passport, db.user);
app.use(methodOverride("_method"));

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({
  force: true
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});