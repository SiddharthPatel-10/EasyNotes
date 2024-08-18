const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload PDF to Cloudinary
const uploadPdf = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw", // Specify that you're uploading a raw file (PDF in this case)
    });
    console.log("Upload result:", result);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private/Admin
const createNote = asyncHandler(async (req, res) => {
  const { title, subjectId } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error("No file provided");
  }

  const filePath = req.file.path;

  try {
    const fileUrl = await uploadPdf(filePath);

    // Create a new note with the Cloudinary URL
    const note = new Note({
      title,
      fileUrl,
      subject: subjectId,
    });

    const createdNote = await note.save();

    // Clean up local file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error removing local file:", err);
      } else {
        console.log("Local file removed successfully.");
      }
    });

    res.status(201).json(createdNote);
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    res
      .status(500)
      .json({
        message: "Error uploading file to Cloudinary",
        error: error.message,
      });
  }
});

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().populate("subject");
  res.status(200).json(notes);
});

// @desc    Get note by ID
// @route   GET /api/notes/:id
// @access  Public
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id).populate("subject");

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.status(200).json(note);
});

// @desc    Update note by ID
// @route   PUT /api/notes/:id
// @access  Private/Admin
const updateNote = asyncHandler(async (req, res) => {
  const { title, subjectId, file } = req.body;
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (file) {
    const fileUrl = await uploadPdf(file);
    note.fileUrl = fileUrl;
  }

  note.title = title || note.title;
  note.subject = subjectId || note.subject;

  const updatedNote = await note.save();

  res.status(200).json(updatedNote);
});

// @desc    Delete note by ID
// @route   DELETE /api/notes/:id
// @access  Private/Admin
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  await note.remove();

  res.status(200).json({ message: "Note removed" });
});

// @desc    Get notes by subject ID
// @route   GET /api/notes?subjectId=:subjectId
// @access  Public
const getNotesBySubject = async (req, res) => {
  try {
    const { subjectId } = req.query;

    if (!subjectId) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    const notes = await Note.find({ subject: subjectId });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getNotesBySubject,
};
