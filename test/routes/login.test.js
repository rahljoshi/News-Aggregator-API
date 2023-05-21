process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../index");
const expect = require("chai").expect;

describe("verifies the login in flow", () => {
  beforeEach((done) => {
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
        done();
      });
  });

  it("successful login", (done) => {
    let singupBody = {
      email: "test12345@gmail.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/register")
      .send(singupBody)
      .end((err, res) => {
        let signInBody = {
          email: "test12345@gmail.com",
          password: "test1234",
        };
        chai
          .request(server)
          .post("/login")
          .send(signInBody)
          .end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body.user.email).equal("test12345@gmail.com");
            expect(res.body.user.username).equal("jacksparrow");
            expect(res.body.message).equal("Login successfull");
            expect(res.body).to.have.property("accessToken");
            done();
          });
      });
  });

  it("Invalid password while signing in", (done) => {
    let singupBody = {
      username: "jacksparrow",
      email: "test12345@gmail.com",
      password: "test12344444",
    };
    chai
      .request(server)
      .post("/register")
      .send(singupBody)
      .end((err, res) => {
        let signInBody = {
          email: "test12345@gmail.com",
          password: "test12345",
        };
        chai
          .request(server)
          .post("/login")
          .send(signInBody)
          .end((err, res) => {
            expect(res.status).equal(404);
            expect(res.body.message).equal("Enter correct password");
            expect(res.body.accessToken).to.be.null;
            done();
          });
      });
  });

  it("User does not exist while signing in", (done) => {
    let singupBody = {
      email: "test12345@gmail.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/register")
      .send(singupBody)
      .end((err, res) => {
        let signInBody = {
          email: "someOtherTest@gmail.com",
          password: "test12345",
        };
        chai
          .request(server)
          .post("/login")
          .send(signInBody)
          .end((err, res) => {
            expect(res.status).equal(404);
            expect(res.body.message).equal("Enter a valid email");
            expect(res.body.accessToken).to.be.undefined;
            done();
          });
      });
  });
});
