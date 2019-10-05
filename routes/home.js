const express = require("express");
const router = express.Router();

// 載入auth middleware
const { authenticated } = require("../config/auth");

// 載入database
const db = require("../models");
const Todo = db.Todo;
const User = db.User;

router.get("/", authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error("user not found");
      return Todo.findAll({
        where: { UserId: req.user.id }
      });
    })
    .then(todos => {
      return res.render("index", { todos: todos });
    })
    .catch(error => {
      return res.status(422).json(error);
    });
});

module.exports = router;
