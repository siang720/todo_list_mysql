const express = require("express");
const port = 3000;
const app = express();

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

const db = require("./models");
const Todo = db.Todo;
const User = db.User;

//template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// setting method-override
app.use(methodOverride("_method"));

// 首頁路由
app.use("/", require("./routes/home"));

// 認證系統路由
// login page
app.get("/users/login", (req, res) => {
  res.render("login");
});
// login submit
app.post("/users/login", (req, res) => {
  res.send("login");
});
// register page
app.get("/users/register", (req, res) => {
  res.render("register");
});
// register submit
app.post("/users/register", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => res.redirect("/"));
});
// logout
app.get("/users/logout", (req, res) => {
  res.send("logout");
});

// start listen
app.listen(port, () => {
  console.log("App is running on localhost:3000");
});
