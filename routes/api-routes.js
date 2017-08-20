// Dependencies
// Requiring our Post model
var db = require("../models");
// Routes
module.exports = (app) => {
    // GET route for getting all of the posts
    app.get("/", (req, res) => {
        db.Post.findAll()
            .then((dbPost) => {
                var data = { posts: dbPost };
                res.render("index", data);
            });
    });
    // // Get route for returning posts of a specific location
    // app.get("/api/posts/category/:location", (req, res) => {
    //     db.Post.findAll({
    //             where: {
    //                 category: req.params.location
    //             }
    //         })
    //         .then((dbPost) => {
    //             res.json(dbPost);
    //         });
    //});
    // POST route for saving a new post
    app.post("/", (req, result) => {
        console.log(req.body);
        db.Post.create({
                name: req.body.name,
                body: req.body.body,
                location: req.body.location
            })
            .then((dbPost) => {
                result.redirect("/");
            });
    });
};