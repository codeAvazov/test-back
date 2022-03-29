const express = require("express");
const app = express();

//
const db = require("./db.js");
const route = require("./router/data.js");

app.use(express.json());
app.use("/", (req, res) => res.send("Hello !"));
app.use("/api", route);

(async function () {
  try {
    await db();
    app.listen(5555, () => console.log("Server has been started !"));
  } catch (error) {
    console.error(error);
  }
})();
