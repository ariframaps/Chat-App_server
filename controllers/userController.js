const { DBupdateUser, DBgetAllUsers } = require("../model/userModel");

module.exports.updateUser = async (req, res) => {
  try {
    await DBupdateUser(req.params.id, req.body);
    return res.json({
      status: true,
      msg: "Avatar updated!",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong, please try again",
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const data = await DBgetAllUsers();
    return res.json({
      status: true,
      data,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong, please try again",
    });
  }
};
