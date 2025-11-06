const express = require("express");
const gradeController = require("../controllers/gradeController");
const {
  checkAuthAndRole,
  checkRole,
} = require("../middlewares/authMiddleware");
const { validateResult } = require("../middlewares/validationMiddleware");
const { gradeCreationValidators } = require("../validators/gradeValidators");

const router = express.Router();

router.use(checkAuthAndRole);

router
  .route("/")
  .post(
    checkRole(["admin", "profesor"]),
    gradeCreationValidators,
    validateResult,
    gradeController.createGrade
  )
  .get(checkRole(["admin", "profesor", "elev"]), gradeController.getGrades);

router
  .route("/:id")
  .put(checkRole(["admin", "profesor"]), gradeController.updateGrade)
  .delete(checkRole(["admin", "profesor"]), gradeController.deleteGrade);

module.exports = router;
