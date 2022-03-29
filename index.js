require("dotenv").config();
const express = require("express");
const app = express();

//
const db = require("./db.js");
const route = require("./router/data.js");

app.use(express.json());
// app.use("/", (req, res) => res.send("Hello !"));
app.use("/api", route);

const PORT = process.env.PORT || 5555;
const DB_PATH =
  process.env.DB_PATH ||
  "mongodb+srv://ulug:test1717@cluster0.wvqoe.mongodb.net/rg1db?retryWrites=true&w=majority";

(async function () {
  try {
    await db(DB_PATH);
    app.listen(PORT, () => console.log("Server has been started !"));
  } catch (error) {
    console.error(error);
  }
})();
