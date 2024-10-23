const { DBupdateUser } = require("../model/userModel");

module.exports.updateUser = async (req, res) => {
  try {
    console.log("sudah masuk ke controller");
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
