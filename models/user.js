const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "username already taken"],
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  newspreferences: {
    type: [String],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("User", userSchema);
