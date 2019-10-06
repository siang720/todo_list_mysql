const express = require("express");
const port = 3000;
const app = express();
// 判別開發環境
if (process.env.NODE_ENV !== "production") {
  // 如果不是 production 模式
  require("dotenv").config(); // 使用 dotenv 讀取 .env 檔案
}
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

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

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  // 新增兩個 flash message 變數
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

// 載入路由器
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/user"));
app.use("/todos", require("./routes/todo"));
app.use("/auth", require("./routes/auths"));

// start listen
app.listen(port, () => {
  console.log(`App is running on localhost:${port}`);
});
