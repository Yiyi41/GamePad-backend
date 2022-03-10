const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/isAuthenticated");
const Review = require("../models/Review");

router.post("/review", isAuthenticated, async (req, res) => {
  try {
    const newReview = new Review({
      title: req.fields.title,
      gameId: req.fields.gameId,
      content: req.fields.content,
      user: req.userAuth._id,
    });
    // console.log(req.userAuth._id);
    // console.log(newReview);

    await newReview.save();
    res.status(200).json(newReview);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
