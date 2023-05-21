const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/usersTestDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection
  .once("open", () => console.log("Connected!"))
  .on("error", (error) => {
    console.warn("Error : ", error);
  });

beforeEach((done) => {
  console.log("running before each clause");
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
