const express = require("express");
const router = express.Router();
const {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  getSubjectsBySemester,
} = require("../controllers/subjectController");
const { protect, admin } = require("../middleware/authMiddleware");

// Routes to create a new subject and get all subjects
router.route("/").post(protect, admin, createSubject);

router.route("/").get(getSubjectsBySemester);
// Routes to get, update, and delete a specific subject by ID
router
  .route("/:id")
  .get(getSubjectById)
  .put(protect, admin, updateSubject)
  .delete(protect, admin, deleteSubject);

module.exports = router;
