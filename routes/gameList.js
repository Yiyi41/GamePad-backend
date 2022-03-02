const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/", async (req, res) => {
  const name = req.query.search;
  const page = req.query.page;
  const genres = req.query.genres;
  const platforms = req.query.platforms;
  let queryforAxios = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${name}`;

  if (genres !== "") queryforAxios += `&genres=${genres}`;
  if (platforms !== "") queryforAxios += `&platform=${platforms}`;

  // console.log(queryforAxios);
  try {
    const response = await axios.get(queryforAxios);
    //   `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&search=${name}`
    // );

    res.json(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
});

module.exports = router;
