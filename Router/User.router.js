const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/User.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, age, mob, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res
          .status(400)
          .send({ msg: "Something went wrong", Error: err.message });
      } else {
        const user = new UserModel({ name, age, mob, email, pass: hash });
        await user.save();
        res.status(200).send({ msg: "New user has been registered" });
      }
    });
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", Error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "masai");
          res.status(200).send({ msg: "Login successful", token: token });
        } else {
          res.send({ msg: "User not found" });
        }
      });
    } else {
      res.send({ msg: "User not found" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", Error: err.message });
  }
});

module.exports = { userRouter };
