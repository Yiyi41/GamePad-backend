const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

router.get("/reviewlist/:gameId", async (req, res) => {
  try {
    const reviewList = await Review.find({
      gameId: req.params.gameId,
    });
    // .populate("user");
    console.log(reviewList);
    res.status(200).json(reviewList);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
