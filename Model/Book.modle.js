const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  page: { type: Number, required: true },
  book_id: { type: String, required: true },
  user: { type: String, required: true },
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = { BookModel };
