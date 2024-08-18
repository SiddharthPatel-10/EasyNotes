const asyncHandler = require('express-async-handler');
const Subject = require('../models/Subject');

// @desc    Create a new subject
// @route   POST /api/subjects
// @access  Private/Admin
const createSubject = asyncHandler(async (req, res) => {
    const { name, semesterId } = req.body;

    // Ensure semesterId is provided
    if (!semesterId) {
        return res.status(400).json({ message: 'Semester ID is required' });
    }

    // Create new subject
    const subject = new Subject({ name, semester: semesterId });
    const createdSubject = await subject.save();

    res.status(201).json(createdSubject);
});
// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
const getSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find({}).populate('semester');
    res.json(subjects);
});

// @desc    Get a single subject by ID
// @route   GET /api/subjects/:id
// @access  Public
const getSubjectById = asyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.params.id).populate('semester');
    if (subject) {
        res.json(subject);
    } else {
        res.status(404);
        throw new Error('Subject not found');
    }
});

// @desc    Update a subject
// @route   PUT /api/subjects/:id
// @access  Private/Admin
const updateSubject = asyncHandler(async (req, res) => {
    const { name, semesterId } = req.body;
    const subject = await Subject.findById(req.params.id);
    if (subject) {
        subject.name = name || subject.name;
        subject.semester = semesterId || subject.semester;
        const updatedSubject = await subject.save();
        res.json(updatedSubject);
    } else {
        res.status(404);
        throw new Error('Subject not found');
    }
});

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
// @access  Private/Admin
const deleteSubject = asyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    if (subject) {
        await subject.remove();
        res.json({ message: 'Subject removed' });
    } else {
        res.status(404);
        throw new Error('Subject not found');
    }
});


// Get subjects by semester ID
// @route   GET /api/subjects?semesterId=:semesterId
// @access  Public
const getSubjectsBySemester = async (req, res) => {
    try {
        const { semesterId } = req.query;

        if (!semesterId) {
            return res.status(400).json({ message: 'Semester ID is required' });
        }

        const subjects = await Subject.find({ semester: semesterId });

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error });
    }
};

module.exports = {
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
    getSubjectsBySemester
};
