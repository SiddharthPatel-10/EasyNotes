const asyncHandler = require('express-async-handler');
const Semester = require('../models/Semester');
const Branch = require('../models/Branch');

const createSemester = asyncHandler(async (req, res) => {
    const { number, branchId } = req.body;

    if (!number || !branchId) {
        res.status(400).json({ message: 'Number and branchId are required' });
        return;
    }

    // Check if the branch exists (optional but recommended)
    const branchExists = await Branch.findById(branchId);
    if (!branchExists) {
        res.status(404).json({ message: 'Branch not found' });
        return;
    }

    const semester = new Semester({ number, branch: branchId });
    const createdSemester = await semester.save();
    res.status(201).json(createdSemester);
});

// @desc    Get all semesters
// @route   GET /api/semesters
// @access  Public
const getSemesters = asyncHandler(async (req, res) => {
    const semesters = await Semester.find({}).populate('branch');
    res.json(semesters);
});

// @desc    Get a single semester by ID
// @route   GET /api/semesters/:id
// @access  Public
const getSemesterById = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id).populate('branch');
    if (semester) {
        res.json(semester);
    } else {
        res.status(404);
        throw new Error('Semester not found');
    }
});

// @desc    Update a semester
// @route   PUT /api/semesters/:id
// @access  Private/Admin
const updateSemester = asyncHandler(async (req, res) => {
    const { number, branchId } = req.body;
    const semester = await Semester.findById(req.params.id);
    if (semester) {
        semester.number = number || semester.number;
        semester.branch = branchId || semester.branch;
        const updatedSemester = await semester.save();
        res.json(updatedSemester);
    } else {
        res.status(404);
        throw new Error('Semester not found');
    }
});

// @desc    Delete a semester
// @route   DELETE /api/semesters/:id
// @access  Private/Admin
const deleteSemester = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id);
    if (semester) {
        await semester.remove();
        res.json({ message: 'Semester removed' });
    } else {
        res.status(404);
        throw new Error('Semester not found');
    }
});


// @desc    Get semesters by branch ID
// @route   GET /api/semesters?branchId=:branchId
// @access  Public
const getSemestersByBranch = async (req, res) => {
    try {
        const { branchId } = req.query;

        if (!branchId) {
            return res.status(400).json({ message: 'Branch ID is required' });
        }

        const semesters = await Semester.find({ branch: branchId });

        res.status(200).json(semesters);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching semesters', error });
    }
};

module.exports = {
    createSemester,
    getSemesters,
    getSemesterById,
    updateSemester,
    deleteSemester,
    getSemestersByBranch
};
