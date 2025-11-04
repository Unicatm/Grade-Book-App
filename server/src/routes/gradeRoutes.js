const express = require("express");
const gradeController = require("../controllers/gradeController");
const {
  checkAuthAndRole,
  checkRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(checkAuthAndRole);

router
  .route("/")
  .post(checkRole(["admin", "profesor"]), gradeController.createGrade)
  .get(checkRole(["admin", "profesor", "elev"]), gradeController.getGrades);

module.exports = router;
