//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var path = require("path");
var env = require('dotenv').load();
// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8000;
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
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static("public/"));
// Set Handlebars
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Routes
var authROute =require("./routes/auth.js")(app);

app.use(methodOverride("_method"));

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({
  force: true
}).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});