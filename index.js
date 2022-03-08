// require("dotenv").config();
const express = require("express");
const app = express();

const formidable = require("express-formidable");
app.use(formidable());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Gamepad-app");

const cors = require("cors");
app.use(cors());

//IMPORT ROUTES FOR REQUESTS TO RAWG API
const gameList = require("./routes/gameList");
app.use(gameList);

const gameDetails = require("./routes/gameDetails");
app.use(gameDetails);

//IMPORT ROUTES FOR SIGN UP
const signupRoutes = require("./routes/signup");
app.use(signupRoutes);

//IMPORT ROUTES FOR LOGIN
const loginRoutes = require("./routes/login");
app.use(loginRoutes);

app.all("*", (req, res) => {
  res.json("all routes");
});

app.listen(3000, () => {
  console.log("Server has started 🤖💫");
});
