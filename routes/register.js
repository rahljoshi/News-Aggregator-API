const registerRouter = require("express").Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");

registerRouter.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user
    .save()
    .then((data) => {
      res.status(200).send({ message: "Account registered successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
});

module.exports = registerRouter;
