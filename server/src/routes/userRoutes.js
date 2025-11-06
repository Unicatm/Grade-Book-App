const express = require("express");
const userController = require("../controllers/userController");
const {
  checkAuthAndRole,
  checkRole,
} = require("../middlewares/authMiddleware");
const { validateResult } = require("../middlewares/validationMiddleware");
const { userCreationValidators } = require("../validators/userValidator");

const router = express.Router();

router.use(checkAuthAndRole);

router
  .route("/")
  .get(checkRole(["admin"]), userController.getAllUsers)
  .post(
    checkRole(["admin"]),
    userCreationValidators,
    validateResult,
    userController.createUser
  );

module.exports = router;
