const express = require("express");
const { isAuthenticated } = require("../Auth/IsAuthenticated");
const {
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
  getAllUsers,
  getOwnDetails,
  getTaskUsers,
  userDetails,
} = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticated, userProfile);
router.route("/logout").post(isAuthenticated, logoutUser);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/get/user/details").get(isAuthenticated, getOwnDetails);
router.route("/task/users").post(isAuthenticated, getTaskUsers);
router.route("/user/report/:id").get(isAuthenticated, userDetails);

module.exports = router;
