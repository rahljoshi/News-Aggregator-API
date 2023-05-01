const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const newsPreferencesRouter = require("./routes/preferences");
const newsRouter = require("./routes/getNews");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;
require("dotenv").config();

try {
  mongoose.connect("mongodb://localhost:27017/news-api", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("connected to db");
} catch (error) {
  handleError(error);
}

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/preferences", newsPreferencesRouter);
app.use("/news", newsRouter);

app.listen(port, (err) => {
  if (err) {
    console.log("something is wrong I can feel it");
  } else {
    console.log("Server started at port " + port);
  }
});
