const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// REQUEST FOR GET DETAILS OF A GAME WITH ID REQUIRED
router.get("/gamedetails/:id", async (req, res) => {
  const gameId = req.params.id;
  //   console.log(gameId);
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${process.env.API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
});

module.exports = router;
