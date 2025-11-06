const { validationResult } = require("express-validator");

exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Error at validate data",
      errors: errors.array(),
    });
  }

  next();
};
