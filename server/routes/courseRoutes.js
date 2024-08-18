const express = require('express');
const router = express.Router();
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/authMiddleware');

// Routes to create a new course and get all courses
router.route('/')
    .post(protect, admin, createCourse) // Create course - protected and admin only
    .get(getCourses); // Get all courses - open access

// Routes to get, update, and delete a specific course by ID
router.route('/:id')
    .get(getCourseById) // Get course by ID - open access (or protect if needed)
    .put(protect, admin, updateCourse) // Update course - protected and admin only
    .delete(protect, admin, deleteCourse); // Delete course - protected and admin only

module.exports = router;
