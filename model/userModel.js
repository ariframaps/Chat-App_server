const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

const DBgetUser = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const DBgetAllUsers = async () => {
  const allUsers = await User.find();

  // Hapus field password dari setiap user
  const usersWithoutPasswords = allUsers.map((user) => {
    const userObject = user.toObject(); // Ubah Mongoose document jadi plain object
    delete userObject.password; // Hapus password
    delete userObject._id;
    delete userObject.__v;
    return userObject;
  });

  return usersWithoutPasswords;
};

const DBaddUser = async (data, hashedPwd) => {
  try {
    const newUser = new User({
      username: data.username,
      email: data.email,
      password: hashedPwd,
    });

    await newUser.save();
    console.log("register successfull");
    return newUser;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const DBupdateUser = async (id, objectToUpdate) => {
  try {
    await User.findByIdAndUpdate(id, objectToUpdate);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { User, DBaddUser, DBgetAllUsers, DBgetUser, DBupdateUser };
