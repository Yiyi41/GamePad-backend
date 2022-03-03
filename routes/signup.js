const express = require("express");
const router = express.Router();

// METHOD FOR AUTHENTIFICATION
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// IMPORT USER MODEL
const User = require("../models/User");

// REQUEST TO API
router.post("/signup", async (req, res) => {
  console.log(req.fields);
  try {
    // VARIABLES FOR CREATION OF USER TOKEN
    const newSalt = uid2(16);
    const newHash = SHA256(req.fields.password + newSalt).toString(encBase64);
    const newToken = uid2(16);

    // VARIABLE FOR CHECKING IF USER ALREADY EXISTS
    const userToCheck = await User.findOne({ email: req.fields.email });

    // CONDITON FOR CHECKING IF USER ALREADY EXISTS
    if (userToCheck) {
      res.status(400).json("cet email existe déjà");
    } else if (!req.fields.username) {
      res.status(400).json("username est obligatoire");

      //   IF NOT EXISTS, CREATION OF A NEW USER
    } else {
      const newUser = new User({
        email: req.fields.email,
        account: {
          username: req.fields.username,
          age: req.fields.age,
        },
        token: newToken,
        hash: newHash,
        salt: newSalt,
      });

      // SAVE USER
      await newUser.save();

      //   RESPONSE WITH INFO BELOW
      res.status(200).json({
        id: newUser.id,
        account: newUser.account,
        token: newUser.token,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
