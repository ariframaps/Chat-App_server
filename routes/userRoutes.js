const { updateUser } = require("../controllers/userController");

const userRoutes = require("express").Router();

userRoutes.post("/set-avatar/:id", updateUser); //set avatar route

module.exports = userRoutes;
