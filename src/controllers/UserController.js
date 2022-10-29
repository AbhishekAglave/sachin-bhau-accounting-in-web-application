const User = require("../models/User");

const getUsers = async (req, res) => {
    if(req.user){
        const users = await User.getUsers();
        res.send(users);
    }else{
        res.status(403)
        res.json({message: "You are not logged in, please login first"});
    }
};
const createUser = async (req, res) => {
  console.log("request body : ", req.body);
  try {
    const newUser = await User.createUser(req.body);
    res.status(201);
    res.send({message: "User created successfully"});
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const loggedInUser = (req, res) => {
  if (req.user) {
    res.send(req.user); // user and session data set when authenticated
  } else {
    res.json({message: "No user currently logged in"});
  }
};

module.exports = {
  getUsers,
  createUser,
  loggedInUser
};