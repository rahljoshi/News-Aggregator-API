const newsRouter = require("express").Router();
const fetch = require("node-fetch");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/user");

newsRouter.get("/", verifyToken, async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    const preferences = user.newspreferences;
    let dataFetched = [];
    for (const preference of preferences) {
      console.log(preference);
      dataFetched.push(
        await fetch(
          `https://newsapi.org/v2/everything?q=${preference}&apiKey=${process.env.API_KEY}`
        )
      );
    }
    const finalData = await Promise.all(dataFetched.map((data) => data.json()));
    return res.status(200).send({ data: finalData });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = newsRouter;
