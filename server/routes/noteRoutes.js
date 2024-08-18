const express = require("express");
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getNotesBySubject,
} = require("../controllers/noteController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../utils/uploadPdf");

// Middleware for handling file uploads
// router.use(upload.single("file")); // Handle single file upload with key 'file'

// router
  // .route("/")
  // .post(protect, admin, createNote) 
  // .get(getAllNotes); // Get all notes
// router.route("/").get(getNotesBySubject);

router
  .route("/")
  .post(protect, admin, upload.single("file"), createNote)
  .get(getNotesBySubject); // Adjust as necessary

router
  .route("/:id")
  .get(getNoteById) // Get a note by ID
  .put(protect, admin, updateNote) // Update a note by ID
  .delete(protect, admin, deleteNote); // Delete a note by ID

module.exports = router;
