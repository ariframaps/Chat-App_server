const { updateUser, getAllUsers } = require("../controllers/userController");

const userRoutes = require("express").Router();

userRoutes.post("/set-avatar/:id", updateUser); //set avatar route
userRoutes.get("/get-allusers", getAllUsers); //set avatar route

module.exports = userRoutes;
