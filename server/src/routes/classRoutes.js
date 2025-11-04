const express = require("express");
const classController = require("../controllers/classController");
const {
  checkAuthAndRole,
  checkRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(checkAuthAndRole);

router
  .route("/")
  .post(checkRole(["admin"]), classController.createClass)
  .get(checkRole(["admin"]), classController.getAllClasses);

router.route("/:id").get(classController.getClassById);

module.exports = router;
