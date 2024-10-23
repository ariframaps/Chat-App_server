const { register, login } = require("../controllers/authController");

const authRoutes = require("express").Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

module.exports = authRoutes;
