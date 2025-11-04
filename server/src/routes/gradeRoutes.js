const express = require("express");
const gradeController = require("../controllers/subjectController");

const router = express.Router();

router
  .route("/")
  .post(gradeController.createSubject)
  .get(gradeController.getAllSubjects);

router
  .route("/:id")
  .get(gradeController.getSubjectById)
  .put(gradeController.updateSubject)
  .delete(gradeController.deleteSubject);

module.exports = router;
