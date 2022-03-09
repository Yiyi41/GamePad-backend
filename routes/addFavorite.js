const express = require("express");
const router = express.Router();

const Favorite = require("../models/Favorite");
const User = require("../models/User");

router.post("/addfavorite", async (req, res) => {
  //   console.log(req.fields);

  try {
    // CHECK IF THE GAME ALREADY IN USER'S COLLECTION
    const myUser = await User.findById(req.fields.userId);
    console.log(myUser);
    const isInFavoriteReponse = await Favorite.find({
      gameId: req.fields.gameId,
      user: myUser,
    });
    console.log(isInFavoriteReponse);
    let isFavorite = false;
    if (isInFavoriteReponse.length !== 0) {
      isFavorite = true;
    }
    console.log(isFavorite);

    if (isFavorite == true) {
      console.log("already in the collection");
    } else {
      const newFavorite = new Favorite({
        gameTitle: req.fields.gameTitle,
        gameId: req.fields.gameId,
        gameImage: req.fields.gameImage,
        user: req.fields.userId,
      });
      console.log(newFavorite);
      await newFavorite.save();

      res.status(200).json(newFavorite);
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
