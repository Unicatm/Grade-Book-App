const { db } = require("../config/firebaseAdmin");
const gradesCollection = db.collection("grades");

exports.createGrade = async (req, res) => {
  try {
    const { studentId, subjectId, valoare, data } = req.body;

    if (!studentId || !subjectId || !valoare) {
      return res.status(400).send({
        message: "Missing data",
      });
    }
    if (typeof valoare !== "number" || valoare < 1 || valoare > 10) {
      return res
        .status(400)
        .send({ message: "Grade must be between 1 and 10." });
    }

    const newGrade = {
      studentId,
      subjectId,
      valoare,
      data: data ? new Date(data) : new Date(),
    };

    const docRef = await gradesCollection.add(newGrade);
    res.status(201).send({ id: docRef.id, ...newGrade });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error adding the grade.", error: error.message });
  }
};

exports.getGrades = async (req, res) => {
  try {
    const { studentId, subjectId } = req.query;
    let query = gradesCollection;

    if (studentId) {
      query = query.where("studentId", "==", studentId);
    }
    if (subjectId) {
      query = query.where("subjectId", "==", subjectId);
    }

    const snapshot = await query.get();
    const grades = [];
    snapshot.forEach((doc) => {
      grades.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).send(grades);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting all grades", error: error.message });
  }
};
