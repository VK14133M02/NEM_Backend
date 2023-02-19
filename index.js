const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./Config/db");
const { authentication } = require("./Middlewares/Authentication.middleware");
const { bookRouter } = require("./Router/Book.route");
const { userRouter } = require("./Router/User.router");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use(authentication);
app.use("/book", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Library");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("server is connected");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`server is live at port ${process.env.port}`);
});
