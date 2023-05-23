const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  verifyUser,
  restorePassword,
  updatePassword,
  forgotPassword,
  showRestoreForm,
  generateVerifyToken,
} = require("./../../controllers/auth.controller.js");

const { userSigned } = require("../../middlewares/auth.middlewares");

const {
  validateNewNaturalPerson,
  validateNewJuridicPerson,
} = require("../../validators/user.js");

router.post("/auth/natural/signup", signup);
router.post("/auth/juridic/signup", validateNewJuridicPerson, signup);
router.post("/auth/signin", signin);
router.get("/auth/showRestoreForm/:token", showRestoreForm)
router.post("/auth/forgot", forgotPassword);
router.put("/auth/restore", restorePassword);
router.get("/auth/verify/:token", verifyUser);
router.get("/auth/verify", generateVerifyToken);
router.put("/auth/update", userSigned, updatePassword);

module.exports = router;
