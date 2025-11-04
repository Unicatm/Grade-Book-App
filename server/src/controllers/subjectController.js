const { db } = require("../config/firebaseAdmin");
const subjectsCollection = db.collection("subjects");

exports.createSubject = async (req, res) => {
  try {
    const { nume } = req.body;

    if (!nume) {
      return res.status(400).send({ message: "Subject name is mandatory." });
    }

    const newSubject = {
      nume,
      profesorIds: req.body.profesorIds || [],
    };

    const docRef = await subjectsCollection.add(newSubject);
    res.status(201).send({ id: docRef.id, ...newSubject });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating the subject", error: error.message });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const snapshot = await subjectsCollection.get();
    const subjects = [];
    snapshot.forEach((doc) => {
      subjects.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).send(subjects);
  } catch (error) {
    res.status(500).send({
      message: "Error getting all subjects.",
      error: error.message,
    });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const doc = await subjectsCollection.doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).send({ message: "No subject was found." });
    }

    res.status(200).send({ id: doc.id, ...doc.data() });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting the subject.", error: error.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).send({ message: "No data found for update." });
    }

    const docRef = subjectsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send({ message: "The subject wasn't found." });
    }

    await docRef.update(data);
    res.status(200).send({ message: "Subject updated." });
  } catch (error) {
    res.status(500).send({
      message: "Error updating all subjects",
      error: error.message,
    });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = subjectsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send({ message: "The subject wasn't found." });
    }

    await docRef.delete();
    res.status(200).send({ message: "Subject deleted." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting the subject", error: error.message });
  }
};
