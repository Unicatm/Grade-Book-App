const express = require("express");
const subjectController = require("../controllers/subjectController");

const router = express.Router();

router
  .route("/")
  .post(subjectController.createSubject)
  .get(subjectController.getAllSubjects);

router
  .route("/:id")
  .get(subjectController.getSubjectById)
  .put(subjectController.updateSubject)
  .delete(subjectController.deleteSubject);

module.exports = router;
