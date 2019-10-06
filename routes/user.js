const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// 載入DB
const db = require("../models");
const User = db.User;

// login page
router.get("/login", (req, res) => {
  res.render("login");
});
// login submit
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })(req, res, next);
  console.log(res.locals.warning_msg);
});
// register page
router.get("/register", (req, res) => {
  res.render("register");
});
// register submit
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  // 加入錯誤訊息提示
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "所有欄位都是必填" });
  }

  if (password !== password2) {
    errors.push({ message: "密碼輸入錯誤" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        console.log("User already exists");
        res.render("register", {
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        // bcrypt
        bcrypt.genSalt(10, (err, salt) =>
          // 再用 hash 把鹽跟使用者的密碼配再一起，然後產生雜湊處理後的 hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            // 用 bcrypt 處理密碼後，再把它儲存起來
            newUser
              .save()
              .then(user => {
                res.redirect("/");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});
// logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出");
  res.redirect("/users/login");
});

module.exports = router;
