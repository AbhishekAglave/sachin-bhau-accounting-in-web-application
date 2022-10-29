const mongoose = require("./dbConnection");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // defining schama for the user model
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      defaultValue: Date.now
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema); // creating a model instance and collection in database with given name and schema

const getUsers = async () => {
  const users = await User.find({});
  return users;
};

const createUser = async (user) => {
  const document = await User.findOne({ username: user.username });
  if (document) throw {message: "Username already exists"};
  if (!document) {
    bcrypt.genSalt(10, function(err, salt) {
      if(err) throw err
      bcrypt.hash(user.password, salt, async function(err, hash) {
        if (err) throw err
        const newUser = new User({
          username: user.username,
          salt,
          password: hash
        });
        return await newUser.save();
      });
    });
  }
};

module.exports = {
  User,
  getUsers,
  createUser
};