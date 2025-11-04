const jwt = require("jsonwebtoken");
const { db } = require("../utils/dbService");

const jwtSecret = process.env.JWT_SECRET;

exports.checkAuthAndRole = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .send({ message: "Unauthorized. Token doesn't exist." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const { uid, role, email } = decoded;

    req.user = {
      uid: uid,
      email: email,
      role: role,
      ...userDoc.data(),
    };

    next();
  } catch (error) {
    return res
      .status(403)
      .send({ message: "Expired or invalid token", error: error.message });
  }
};

exports.checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        message: "Acces denied! You don't have the corespondet role.",
      });
    }
    next();
  };
};
