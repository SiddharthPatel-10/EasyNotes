// Import required modules
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const Note = require('../models/Note');

// Load your Google Drive credentials from the downloaded JSON file
const credentialsPath = path.join(__dirname, '../easynotes-435808-3139beee34c3.json'); // Update this path

// Configure Google API
const auth = new google.auth.GoogleAuth({
  keyFile: credentialsPath, // Your credentials file path
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

// Function to upload a PDF to Google Drive
const uploadPdfToGoogleDrive = async (filePath) => {
  try {
    const fileMetadata = {
      name: path.basename(filePath),
      parents: ['16w_FwqiLXVXMTxPkmg4D7IbIn7MWOx49'], // Your Google Drive folder ID
    };

    const media = {
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webContentLink', // Use webContentLink for direct downloads
    });

    // Set file permissions
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone', // Anyone with the link can read the file
      },
    });

    console.log('Uploaded file:', response.data);
    return response.data.webContentLink; // Use webContentLink for direct downloads
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw error;
  }
};

// Route to create a new note
const createNote = asyncHandler(async (req, res) => {
  const { title, subjectId } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error('No file provided');
  }

  const filePath = req.file.path;

  try {
    const fileUrl = await uploadPdfToGoogleDrive(filePath);

    // Create a new note with the Google Drive URL
    const note = new Note({
      title,
      fileUrl, // The URL of the file on Google Drive
      subject: subjectId,
    });

    const createdNote = await note.save();

    // Clean up the local file after uploading
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error removing local file:', err);
      } else {
        console.log('Local file removed successfully.');
      }
    });

    res.status(201).json(createdNote);
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    res.status(500).json({
      message: 'Error uploading file to Google Drive',
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
