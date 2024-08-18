const express = require('express');
const { createSemester, getSemesters, getSemesterById, updateSemester, deleteSemester, getSemestersByBranch } = require('../controllers/semesterController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
// router.route('/').get(getSemesters);
router.route('/').get(getSemestersByBranch);
router.route('/:id').get(getSemesterById);

// Private routes (authentication required)
router.use(protect);
router.route('/').post(createSemester);
router.route('/:id').put(updateSemester).delete(deleteSemester);

module.exports = router;
