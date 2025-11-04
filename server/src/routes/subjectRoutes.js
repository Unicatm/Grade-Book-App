const express = require("express");
const subjectController = require("../controllers/subjectController");
const {
  checkAuthAndRole,
  checkRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(checkAuthAndRole);

router
  .route("/")
  .post(checkRole(["admin"]), subjectController.createSubject)
  .get(
    checkRole(["admin", "profesor", "elev"]),
    subjectController.getAllSubjects
  );

router
  .route("/:id")
  .get(
    checkRole(["admin", "profesor", "elev"]),
    subjectController.getSubjectById
  )
  .put(checkRole(["admin"]), subjectController.updateSubject)
  .delete(checkRole(["admin"]), subjectController.deleteSubject);

module.exports = router;
