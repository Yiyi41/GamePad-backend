const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/isAuthenticated");

const Favorite = require("../models/Favorite");
const User = require("../models/User");

router.post("/addfavorite", isAuthenticated, async (req, res) => {
  // console.log(req);

  try {
    // CHECK IF THE GAME ALREADY IN USER'S COLLECTION

    const isInFavoriteReponse = await Favorite.find({
      gameId: req.fields.gameId,
      user: req.userAuth._id,
    });
    // console.log(isInFavoriteReponse);
    let isFavorite = false;
    if (isInFavoriteReponse.length !== 0) {
      isFavorite = true;
    }
    // console.log(isFavorite);

    if (isFavorite == true) {
      console.log("already in the collection");
    } else {
      const newFavorite = new Favorite({
        gameTitle: req.fields.gameTitle,
        gameId: req.fields.gameId,
        gameImage: req.fields.gameImage,
        user: req.userAuth._id,
      });
      // console.log(newFavorite);
      await newFavorite.save();

      res.status(200).json(newFavorite);
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
