const { body } = require("express-validator");

const gradeCreationValidators = [
  body("valoare")
    .isInt({ min: 1, max: 10 })
    .withMessage("Grade should be between 1 and 10.")
    .toInt(),
];

module.exports = { gradeCreationValidators };
