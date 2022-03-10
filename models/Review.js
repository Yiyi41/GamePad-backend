const mongoose = require("mongoose");
const Review = mongoose.model("Review", {
  title: {
    type: String,
  },

  content: {
    type: String,
  },
  gameId: { type: String },
  gameTitle: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Review;
