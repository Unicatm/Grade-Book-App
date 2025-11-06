const { body } = require("express-validator");

exports.classUpdateValidators = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name of the class should not be empty."),

  body("classTeacherId")
    .optional()
    .isString()
    .withMessage("classTeacherId should be a valid ID."),

  body("teachersList")
    .optional()
    .isArray()
    .withMessage("teachersList should be an array."),

  body("teachersList.*.profesorId")
    .optional()
    .notEmpty()
    .withMessage("profesorId from teachersList cannot be empty."),

  body("teachersList.*.subjectId")
    .optional()
    .notEmpty()
    .withMessage("subjectId from teachersList cannot be empty."),
];
