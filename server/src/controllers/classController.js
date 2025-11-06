const { db } = require("../utils/dbService");
const classesCollection = db.collection("classes");

exports.createClass = async (req, res) => {
  try {
    const { name, classTeacherId, teachersList } = req.body;

    if (!name) {
      return res.status(400).send({ message: "'name' is required!" });
    }

    const newClass = {
      name,
      classTeacherId: classTeacherId || null,
      teachersList: teachersList || [],
    };

    await classesCollection.add(newClass);

    res.status(201).json({ message: "Class was created successfully!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating the class!", error: error.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const snapshot = await classesCollection.get();

    const classes = snapshot.docs.map((doc) => {
      const data = doc.data();

      return { id: doc.id, ...data };
    });

    res.status(200).send(classes);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting all classes.", error: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const doc = await classesCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).send({ message: "No class was found." });
    }
    res.status(200).send({ id: doc.id, ...doc.data() });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting the classes.", error: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).send({ message: "No data sent for update." });
    }

    const docRef = classesCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send({ message: "The class wasn't found." });
    }

    await docRef.update(updateData);
    res.status(200).send({ message: "Class updated!", id: id });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error to update the class.", error: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = classesCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send({ message: "Class not found." });
    }

    await docRef.delete();
    res.status(200).send({ message: "Class was deleted succesfully!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting the class.", error: error.message });
  }
};
