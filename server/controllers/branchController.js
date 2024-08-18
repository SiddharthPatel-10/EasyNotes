const asyncHandler = require("express-async-handler");
const Branch = require("../models/Branch");
const Course = require("../models/Course");

// @desc    Create a new branch
// @route   POST /api/branches
// @access  Private/Admin
const createBranch = async (req, res) => {
  try {
    const { name, course } = req.body;

    // Validate input
    if (!name || !course) {
      return res.status(400).json({ message: "Name and course are required" });
    }

    // Check if the course exists
    const existingCourse = await Course.findById(course);
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create new branch
    const newBranch = new Branch({
      name,
      course,
    });

    await newBranch.save();
    res.status(201).json(newBranch);
  } catch (error) {
    res.status(500).json({ message: "Error creating branch", error });
  }
};

// @desc    Get all branches
// @route   GET /api/branches
// @access  Public
// const getBranches = asyncHandler(async (req, res) => {
//     const branches = await Branch.find({});
//     res.status(200).json(branches);
// });

// @desc    Get a branch by ID
// @route   GET /api/branches/:id
// @access  Public
const getBranchById = asyncHandler(async (req, res) => {
  const branch = await Branch.findById(req.params.id);
  if (!branch) {
    res.status(404).json({ message: "Branch not found" });
    return;
  }
  res.status(200).json(branch);
});

// @desc    Update a branch by ID
// @route   PUT /api/branches/:id
// @access  Private/Admin
const updateBranch = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const branch = await Branch.findById(req.params.id);
  if (!branch) {
    res.status(404).json({ message: "Branch not found" });
    return;
  }

  // Check if the branch name already exists
  const branchExists = await Branch.findOne({ name });
  if (branchExists && branchExists._id.toString() !== req.params.id) {
    res.status(400).json({ message: "Branch name already exists" });
    return;
  }

  branch.name = name || branch.name;
  const updatedBranch = await branch.save();
  res.status(200).json(updatedBranch);
});

// @desc    Delete a branch by ID
// @route   DELETE /api/branches/:id
// @access  Private/Admin
const deleteBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findById(req.params.id);
  if (!branch) {
    res.status(404).json({ message: "Branch not found" });
    return;
  }

  await branch.remove();
  res.status(200).json({ message: "Branch removed" });
});

// @desc    Get branches by course ID
// @route   GET /api/branches?courseId=:courseId
// @access  Public
const getBranchesByCourse = async (req, res) => {
  try {
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const branches = await Branch.find({ course: courseId });

    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching branches", error });
  }
};

module.exports = {
  createBranch,
  // getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
  getBranchesByCourse,
};
