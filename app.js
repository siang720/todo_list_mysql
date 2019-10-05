const express = require("express");
const port = 3000;
const app = express();

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

const db = require("./models");
const Todo = db.Todo;
const User = db.User;

//template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 載入系統訊息
app.use(flash());

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// setting method-override
app.use(methodOverride("_method"));

// 載入session
app.use(
  session({
    secret: "your secret key",
    resave: "false",
    saveUninitialized: "false"
  })
);

// 使用passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// 載入路由器
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/user"));
app.use("/todos", require("./routes/todo"));

// start listen
app.listen(port, () => {
  console.log(`App is running on localhost:${port}`);
});
