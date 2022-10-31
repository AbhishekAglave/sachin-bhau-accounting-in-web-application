const User = require("../models/User");

const getUsers = async (req, res) => {
  if (req.isAuthenticated()) {
    const users = await User.getUsers();
    res.send(users);
  } else {
    res.status(403);
    res.send({ message: "You are not logged in, please login first" });
  }
};
const createUser = async (req, res) => {
  console.log("request body : ", req.body);

  const onValidUsername = (val) => {
    const usernameRegex = /^[a-z0-9_.]+$/;
    return usernameRegex.test(val);
  };

  const adminKeys = ["0987", "sachinbhau", "admin"];

  if (onValidUsername(req.body.username)) {
    if (req.body.password) {
      if (adminKeys.includes(req.body.adminkey)) {
        try {
          const newUser = await User.createUser({
            username: req.body.username,
            password: req.body.password
          });
          res.status(201);
          res.send({ message: "User created successfully" });
        } catch (error) {
          res.status(400);
          res.send(error);
        }
      } else {
        res.status(400);
        res.send({ message: "Please enter valid admin key" });
      }
    } else {
      res.status(400);
      res.send({ message: "Password can not be empty" });
    }
  } else {
    res.status(400);
    res.send({
      message: "Username should only contain ( a-z ), ( 0-9 ) ( _ ), ( . )"
    });
  }
};

const loggedInUser = (req, res) => {
  if (req.user) {
    res.send(req.user); // user and session data set when authenticated
  } else {
    res.json({ message: "No user currently logged in" });
  }
};

module.exports = {
  getUsers,
  createUser,
  loggedInUser
};
