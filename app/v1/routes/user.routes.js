const express = require("express");
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../../controllers/user.controller");
const router = express.Router();
const { userSigned } = require("../../middlewares/auth.middlewares");
const {
  isAdminOrOwner,
  isOwner,
  isAdmin,
} = require("../../policies/user.policies");

//get all users
router.get("/users", userSigned, isAdmin, getAllUsers);

//get one user
router.get("/user", userSigned, isAdminOrOwner, getOneUser);

//create new user
router.post("/users", userSigned, isAdmin, createUser);

//edit one user
router.patch("/users", userSigned, isAdminOrOwner, updateUser);

// //update password of one user
// router.put('/users/update/:id', userSigned, isOwner, updatePassword);

//delete one user
router.delete("/users/:id", userSigned, isAdminOrOwner, deleteUser);

module.exports = router;
