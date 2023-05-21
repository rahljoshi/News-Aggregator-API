process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../index");
const expect = require("chai").expect;

describe("verifies registering flow", () => {
  it("successful singup", (done) => {
    let singupBody = {
      username: "jacksparrow",
      email: "test12345@gmail.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/register")
      .send(singupBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("Account registered successfully");
        done();
      });
  });

  it("verifies singup flow failing because of email validation", (done) => {
    let singupBody = {
      username: "jacksparrow",
      email: "test12345@gmail@.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/register")
      .send(singupBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message.message).equal(
          "User validation failed: email: test12345@gmail@.com is not a valid email!"
        );
        expect(res.body.message._message).equal("User validation failed");
        done();
      });
  });

  it("verifies singup flow failing because of incomplete properties passed", (done) => {
    let singupBody = {
      email: "test12345@gmail.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/register")
      .send(singupBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message.message).equal(
          "User validation failed: username: Path `username` is required."
        );
        expect(res.body.message._message).equal("User validation failed");
        done();
      });
  });
});
