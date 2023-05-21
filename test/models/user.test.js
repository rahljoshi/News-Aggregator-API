var User = require("../../models/user");
const expect = require("chai").expect;

describe("Creating documents in MongoDB", () => {
  it("Creates a New User Successfully", (done) => {
    const user = new User({
      username: "Test User",
      email: "test1234@gmail.com",
      newspreferences: [],
      password: "test1234",
    });
    user.save().then((user) => {
      expect(!user.isNew).equal(true);
      done();
    });
  }).timeout(10000);

  it("validates the email of the user", (done) => {
    const user = new User({
      username: "Test User",
      email: "",
      newspreferences: [],
      password: "test1234",
    });
    user.save().catch((err) => {
      console.log(err._message);
      expect(err._message).equal("User validation failed");
      done();
    });
  }).timeout(10000);

  it("validates the fields of the user", (done) => {
    const user = new User({
      username: "Test User",
      email: "test1234@gmail.com",
      password: "",
    });
    user.save().catch((err) => {
      expect(err._message).equal("User validation failed");
      done();
    });
  }).timeout(5000);
});
