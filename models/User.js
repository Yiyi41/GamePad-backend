const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },

  account: {
    username: {
      required: true,
      type: String,
    },
    age: { type: Number, min: 18 },
    avatar: [String],
  },

  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
