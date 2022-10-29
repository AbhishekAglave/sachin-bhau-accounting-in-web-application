var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");

/* GET users listing. */
router.get("/users", UserController.getUsers);
router.post("/signup", UserController.createUser);
router.get("/user", UserController.loggedInUser);

module.exports = router;