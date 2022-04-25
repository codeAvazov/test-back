const route = require("express").Router();

//
const AuthController = require("../controller/auth.js");

route.post("/register", AuthController.register);
route.post("/login", AuthController.login);
route.get("/userme", AuthController.userme);

module.exports = route;
