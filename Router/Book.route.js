const express = require("express");
const { BookModel } = require("../Model/Book.modle");

const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
  try {
    const book = await BookModel.find({ user: req.body.user });
    res.status(200).send(book);
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", Error: err.message });
  }
});

bookRouter.post("/create", async (req, res) => {
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.status(200).send({ msg: "New book has been added" });
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", Error: err.message });
  }
});

bookRouter.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  const book = await BookModel.findOne({ _id: ID });
  let user_in_book = book.user;
  let user_making_req = req.body.user;
  try {
    if (user_in_book !== user_making_req) {
      res.status(500).send({ msg: "You are not Authorised" });
    } else {
      await BookModel.findByIdAndUpdate({ _id: ID }, payload);
      res.status(200).send("Book data has been modified");
    }
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", Error: err.message });
  }
});

bookRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  const book = await BookModel.findOne({ _id: ID });
  let user_in_book = book.user;
  let user_making_req = req.body.user;
  try {
    if (user_in_book !== user_making_req) {
      res.status(500).send({ msg: "You are not Authorised" });
    } else {
      await BookModel.findByIdAndDelete({ _id: ID });
      res.status(200).send("Book data has been deleted");
    }
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", Error: err.message });
  }
});

module.exports = { bookRouter };
