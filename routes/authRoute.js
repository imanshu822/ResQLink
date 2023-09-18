const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMIddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/:id", authMiddleware, getaUser);
router.delete("/:id", authMiddleware, deleteaUser);
router.put("/:id", authMiddleware, updatedUser);
router.put("/block-User/:id", authMiddleware, blockUser);
router.put("/unblock-User/:id", authMiddleware, unblockUser);

module.exports = router;
