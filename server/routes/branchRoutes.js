const express = require('express');
const {
  createBranch,
//   getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
  getBranchesByCourse,
} = require('../controllers/branchController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
// router.route('/').get(getBranches); // Fetch all branches (or filter if query parameters are provided)
router.route('/').get(getBranchesByCourse); // Fetch branches by course
router.route('/:id').get(getBranchById); // Fetch a specific branch by ID

// Private routes (authentication required)
router.use(protect);
router.route('/').post(createBranch); // Create a new branch
router.route('/:id').put(updateBranch).delete(deleteBranch); // Update or delete a specific branch by ID

module.exports = router;
