const { Router } = require("express");
const route = Router();

//
const data = require("../controller/data");

route.get("/todo", data.getAll);
route.get("/todo/:id", data.getOne);
route.get("/todo/toggleComplete/:id", data.toggleComplete);
route.post("/todo", data.add);
route.put("/todo", data.update);
route.delete("/todo/:id", data.delete);

module.exports = route;
