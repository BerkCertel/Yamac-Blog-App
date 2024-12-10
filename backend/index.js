const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const dotenv = require("dotenv");
const book = require("./routes/book.js");
const article = require("./routes/article.js");
const user = require("./routes/user.js");
const guestbook = require("./routes/guestbook.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/", book);
app.use("/", article);
app.use("/", user);
app.use("/", guestbook);

db();

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running on port 5000");
});
