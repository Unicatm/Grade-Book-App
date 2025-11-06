const { db } = require("../utils/dbService");
const gradesCollection = db.collection("grades");
const usersCollection = db.collection("users");
const classesCollection = db.collection("classes");

exports.createGrade = async (req, res) => {
  try {
    const { studentId, subjectId, valoare, data } = req.body;

    const loggedInUserId = req.user.uid;
    const loggedInUserRole = req.user.role;

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

    if (loggedInUserRole === "profesor") {
      const studentDoc = await usersCollection.doc(studentId).get();

      if (
        !studentDoc.exists ||
        studentDoc.data().role !== "elev" ||
        !studentDoc.data().classId
      ) {
        return res.status(404).send({
          message: "Student wasn't found or isn't in any class.",
        });
      }

      const studentClassId = studentDoc.data().classId;

      const classDoc = await classesCollection.doc(studentClassId).get();

      if (!classDoc.exists) {
        return res.status(404).send({
          message: "Student's class not found.",
        });
      }

      const teachersList = classDoc.data().teachersList || [];

      const hasAccesToGrade = teachersList.find(
        (tl) => tl.subjectId === subjectId && tl.profesorId === loggedInUserId
      );

      if (!hasAccesToGrade) {
        return res.status(403).send({
          message:
            "Forbbiden action! You don't have permision to teach that subject!",
        });
      }
    } else if (loggedInUserRole !== "admin") {
      return res.status(403).send({
        message: "Forbbiden action! You dont have any permision adding grades.",
      });
    }

    const newGrade = {
      studentId,
      subjectId,
      valoare,
      profesorId: loggedInUserId,
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
    const { uid, role } = req.user;

    let query = gradesCollection;

    if (role === "elev") {
      query = query.where("studentId", "==", uid);
    } else if (role === "profesor") {
      query = query.where("profesorId", "==", uid);

      if (studentId) {
        query = query.where("studentId", "==", studentId);
      }
    } else if (role === "admin") {
      if (studentId) {
        query = query.where("studentId", "==", studentId);
      }
    }

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

exports.updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { valoare, data } = req.body;

    const updateData = {};
    if (valoare) updateData.valoare = valoare;
    if (data) updateData.data = new Date(data);

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .send({ message: "You have to send the value or the date." });
    }
    if (
      valoare &&
      (typeof valoare !== "number" || valoare < 1 || valoare > 10)
    ) {
      return res
        .status(400)
        .send({ message: "The grade should be between 1 and 10" });
    }

    const docRef = gradesCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send({ message: "The grade wasn't found." });
    }

    const gradeData = doc.data();
    if (req.user.role !== "admin" && gradeData.profesorId !== req.user.uid) {
      return res.status(403).send({
        message: "You can modify only your own grades.",
      });
    }

    await docRef.update(updateData);
    res.status(200).send({ message: "Grade updated succesfully!", id: id });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error to update the grade", error: error.message });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = gradesCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send({ message: "The grade wasn't found." });
    }

    const gradeData = doc.data();
    if (req.user.role !== "admin" && gradeData.profesorId !== req.user.uid) {
      return res.status(403).send({
        message: "You can modify only your own grades.",
      });
    }

    await docRef.delete();
    res.status(200).send({ message: "Grade deleted succesfully!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting the grade", error: error.message });
  }
};
