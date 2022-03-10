const express = require("express");
const router = express.Router();

const Favorite = require("../models/Favorite");

router.get("/mycollection/:id", async (req, res) => {
  try {
    const myCollection = await Favorite.find({ user: req.params.id });
    // console.log(myCollection);
    res.status(200).json(myCollection);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
