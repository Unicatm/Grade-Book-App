const express = require("express");
const classController = require("../controllers/classController");
const {
  checkAuthAndRole,
  checkRole,
} = require("../middlewares/authMiddleware");
const { validateResult } = require("../middlewares/validationMiddleware");
const { classUpdateValidators } = require("../validators/classValidators");

const router = express.Router();

router.use(checkAuthAndRole);

router
  .route("/")
  .post(checkRole(["admin"]), classController.createClass)
  .get(checkRole(["admin"]), classController.getAllClasses);

router
  .route("/:id")
  .get(classController.getClassById)
  .put(
    checkRole(["admin"]),
    classUpdateValidators,
    validateResult,
    classController.updateClass
  )
  .delete(checkRole(["admin"]), classController.deleteClass);

module.exports = router;
