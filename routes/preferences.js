const verifyToken = require("../middlewares/verifyToken");
const jwt = require("jsonwebtoken");
const newsPreferencesRouter = require("express").Router();
const User = require("../models/user");
newsPreferencesRouter.get("/", verifyToken, async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Wrong Email" });
    }
    return res.status(200).send({ preferences: user.newspreferences });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

newsPreferencesRouter.put("/", verifyToken, async (req, res) => {
  const { email, preferences } = req.body;

  if (!email || !preferences) {
    return res.status(404).json({ error: "Please enter all the details" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Wrong email" });
    }
    user.newspreferences.push(...preferences);
    await user.save();
    return res.status(201).send({ values: user.newspreferences });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the document." });
  }
});

module.exports = newsPreferencesRouter;
