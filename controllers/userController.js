const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  const hashedPwd = await bcrypt.hash(req.body.password, 12);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPwd,
  });

  await newUser
    .save()
    .then(() => {
      console.log("User successfully registered!");
      delete newUser.password;
      return res.json({ status: true, user: req.body.username });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: false, msg: "Failed to add user" });
    });
};
