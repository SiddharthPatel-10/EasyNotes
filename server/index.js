const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(cors());
// app.use(bodyParser());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connect = require("./config/db");
connect.connectDB();

// Define routes
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/notes', require('./routes/noteRoutes'));
// app.use('/api/categories', require('./routes/categoryRoutes'));

const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const noteRoutes = require("./routes/noteRoutes");
const branchRoutes = require("./routes/branchRoutes");
const semesterRoutes = require("./routes/semesterRoutes");
const contactUsRoute = require("./routes/contactusRoute");
const user = require('./routes/userRoutes'); 

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/semesters", semesterRoutes);
app.use("/api/reach", contactUsRoute);
app.use('/api/auth', user);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
