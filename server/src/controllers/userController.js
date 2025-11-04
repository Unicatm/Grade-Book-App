const { db } = require("../utils/dbService");
const usersCollection = db.collection("users");

exports.createUser = async (req, res) => {
  const { email, name, role, classId } = req.body;

  if (!email || !name || !role) {
    return res.status(400).json({ message: "Email, Name and Role required." });
  }
  if (!["admin", "profesor", "elev"].includes(role)) {
    return res.status(400).json({ message: "Invalide role." });
  }

  try {
    const newUser = {
      email,
      name,
      role,
      classId,
    };

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
