const express = require("express");
const router = express.Router();

const Favorite = require("../models/Favorite");
const User = require("../models/User");

router.post("/removefavorite", async (req, res) => {
  try {
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

    if (isFavorite === true) {
      Favorite.findOneAndDelete({
        gameId: req.fields.gameId,
        user: myUser,
      });

      res.status(200).json("deleted");
    } else {
      console.log("not in the collection");
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
