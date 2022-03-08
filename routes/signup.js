const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//FOR AUTHENTIFICATION
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// IMPORT USER MODEL
const User = require("../models/User");

// REQUEST TO API
router.post("/signup", async (req, res) => {
  console.log(req.fields);
  console.log(req.files);

  try {
    let pictureToUpload = req.files.picture.path;
    const picture = await cloudinary.uploader.upload(pictureToUpload);
    console.log(req.files);
    console.log(req.fields.username);

    // VARIABLES FOR CREATION OF USER TOKEN
    const newSalt = uid2(16);
    const newHash = SHA256(req.fields.password + newSalt).toString(encBase64);
    const newToken = uid2(16);

    // VARIABLE FOR CHECKING IF USER ALREADY EXISTS
    const userToCheck = await User.findOne({ email: req.fields.email });

    // CONDITON FOR CHECKING IF USER ALREADY EXISTS
    if (userToCheck) {
      console.log("email already exist");
      // res.status(400).json("cet email existe déjà");
    } else if (!req.fields.username) {
      console.log("username est obligatoire");
      // res.status(400).json("username est obligatoire");

      //   IF NOT EXISTS, CREATION OF A NEW USER
    } else {
      const newUser = new User({
        email: req.fields.email,
        account: {
          username: req.fields.username,
          // picture: req.files.picture,
          picture: picture,
        },
        token: newToken,
        hash: newHash,
        salt: newSalt,
      });
      // console.log("user created");
      // SAVE USER
      await newUser.save();
      // console.log("user saved");

      //   RESPONSE WITH INFO BELOW
      res.status(200).json({
        id: newUser.id,
        account: newUser.account,
        token: newUser.token,
      });
    }
  } catch (error) {
    // console.log("erreur dans catch");
    // console.log(error.response);
    console.log(error.message);
  }
});

module.exports = router;
