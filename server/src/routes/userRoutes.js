const express = require("express");
const userController = require("../controllers/userController");
const {
  checkAuthAndRole,
  checkRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(checkAuthAndRole);

router
  .route("/")
  .get(checkRole(["admin"]), userController.getAllUsers)
  .post(checkRole(["admin"]), userController.createUser);

module.exports = router;
