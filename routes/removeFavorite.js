const express = require("express");
const router = express.Router();

const Favorite = require("../models/Favorite");
const User = require("../models/User");

router.post("/removefavorite", async (req, res) => {
  try {
    const myUser = await User.findById(req.fields.userId);
    console.log(myUser);
    Favorite.findOneAndDelete({ gameId: req.fields.gameId, user: myUser }).exec(
      (err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, doc });
      }
    );
    console.log(err);
    console.log(doc);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
