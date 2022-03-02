// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

//IMPORT DES ROUTES
const gameList = require("./routes/gameList");
app.use(gameList);

const gameDetails = require("./routes/gameDetails");
app.use(gameDetails);

app.listen(3000, () => {
  console.log("Server has started 🤖💫");
});
