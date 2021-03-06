require("dotenv").config();
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

//IMPORT ROUTE FOR SIGN UP
const signupRoutes = require("./routes/signup");
app.use(signupRoutes);

//IMPORT ROUTE FOR LOGIN
const loginRoutes = require("./routes/login");
app.use(loginRoutes);

// IMPORT ROUTE FOR CHECK IF THE GAME IN FAVORITE
const isFavroriteRoutes = require("./routes/isFavorite");
app.use(isFavroriteRoutes);

//IMPORT ROUTE FOR ADD FAVORIT
const addfavoriteRoutes = require("./routes/addFavorite");
app.use(addfavoriteRoutes);

//IMPORT ROUTE FOR REMOVE FAVORITE
const removefavoriteRoutes = require("./routes/removeFavorite");
app.use(removefavoriteRoutes);

// IMPORT ROUTE FOR MY COLLECTION LIST
const mycollectionRoutes = require("./routes/myCollection");
app.use(mycollectionRoutes);

// IMPORT ROUTE FOR REVIEW
const reviewRoutes = require("./routes/review");
app.use(reviewRoutes);

// IMPORT ROUTE FOR REVIEW LIST
const reviewlisteRoutes = require("./routes/reviewList");
app.use(reviewlisteRoutes);
// ALL ROUTE
app.all("*", (req, res) => {
  res.json("all routes");
});

app.listen(3000, () => {
  console.log("Server has started 🤖💫");
});
