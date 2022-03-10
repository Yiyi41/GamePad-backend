const express = require("express");
const router = express.Router();

const Favorite = require("../models/Favorite");
const User = require("../models/User");

router.post("/isfavorite", async (req, res) => {
  try {
    // CHECK IF THE GAME ALREADY IN USER'S COLLECTION
    const myUser = await User.findById(req.fields.userId);
    // console.log(myUser);
    const isInFavoriteReponse = await Favorite.find({
      gameId: req.fields.gameId,
      user: myUser,
    });
    let isFavorite = false;
    if (isInFavoriteReponse.length !== 0) {
      isFavorite = true;
    }
    res.status(200).json(isFavorite);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
