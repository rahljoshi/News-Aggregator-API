const loginRouter = require("express").Router();

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.post("/", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Enter a valid email" });
      }

      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res
          .status(404)
          .send({ accessToken: null, message: "Enter correct password" });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
        },
        message: "Login successfull",
        accessToken: token,
      });
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }
    });
});

module.exports = loginRouter;
