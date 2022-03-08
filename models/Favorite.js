const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  gameTitle: { type: String },
  gameId: { String },
  gameImage: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorite;
