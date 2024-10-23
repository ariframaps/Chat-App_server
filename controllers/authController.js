const bcrypt = require("bcrypt");
const { DBaddUser, DBgetUser } = require("../model/userModel");

module.exports.register = async (req, res) => {
  const hashedPwd = await bcrypt.hash(req.body.password, 12);
  const result = await DBaddUser(req.body, hashedPwd);
  if (result) {
    console.log(result);
    return res.json({
      status: true,
      user: { email: result.email, _id: result._id },
    });
  } else {
    return res.json({
      status: false,
      msg: "Something weng wrong, please try again",
    });
  }
};

module.exports.login = async (req, res) => {
  const user = await DBgetUser(req.body.email);
  if (user) {
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
      return res.json({
        status: true,
        user: { email: user.email, _id: user._id },
      });
    } else {
      return res.json({ status: false, msg: "Invalid email or password" });
    }
  } else {
    return res.json({ status: false, msg: "Invalid email or password" });
  }
};
