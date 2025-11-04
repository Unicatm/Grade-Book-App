const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { db } = require("../utils/dbService");
const usersCollection = db.collection("users");

const jwtSecret = process.env.JWT_SECRET;
const jwtOptions = { expiresIn: "1d" };

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password required!" });
  }

  try {
    const snapshot = await usersCollection
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res
        .status(401)
        .send({ message: "Authentification failed. Bad credentials." });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const uid = userDoc.id;

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res
        .status(401)
        .send({ message: "Authentification failed. Invalid credentials." });
    }

    const payload = {
      uid: uid,
      role: userData.role,
      email: userData.email,
    };

    const token = jwt.sign(payload, jwtSecret, jwtOptions);

    res.status(200).send({
      token,
      user: {
        uid,
        email: userData.email,
        role: userData.role,
        name: userData.name,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Error at auth",
      error: error.message,
    });
  }
};
