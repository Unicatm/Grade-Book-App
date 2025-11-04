const { db } = require("../utils/dbService");
const usersCollection = db.collection("users");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { email, password, name, role, classId } = req.body;
  const saltRounds = 10;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: "Email, Name and Role required." });
  }
  if (!["admin", "profesor", "elev"].includes(role)) {
    return res.status(400).json({ message: "Invalide role." });
  }

  if (role === "elev" && !classId) {
    return res.status(400).json({ message: "'elev' role needs a 'classId'" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      email,
      password: hashedPassword,
      name,
      role,
    };

    if (role === "elev") {
      newUser.classId = classId;
    }

    await usersCollection.add(newUser);

    res.status(201).json({ message: "User was created successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating the user!", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const snapshot = await usersCollection.get();

    const users = snapshot.docs.map((doc) => {
      const data = doc.data();
      delete data.uid;

      return { id: doc.id, ...data };
    });

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting all users.", error: error.message });
  }
};
