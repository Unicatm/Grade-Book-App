const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const classRoutes = require("./src/routes/classRoutes");
const gradeRoutes = require("./src/routes/gradeRoutes");
const subjectRoutes = require("./src/routes/subjectRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The server is working!");
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/classes", classRoutes);

module.exports = app;
