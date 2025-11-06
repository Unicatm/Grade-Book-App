const { body } = require("express-validator");

const userCreationValidators = [
  body("email")
    .isEmail()
    .withMessage("The email should be valid")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 3 })
    .withMessage("The password must have at least 3 characters."),

  body("name").notEmpty().withMessage("Name is mandatory."),

  body("role")
    .isIn(["admin", "profesor", "elev"])
    .withMessage("Specified role is invalide."),

  body("classId").custom((value, { req }) => {
    if (req.body.role === "elev" && !value) {
      throw new Error('Role "elev" needs a classId.');
    }

    return true;
  }),
];

module.exports = { userCreationValidators };
